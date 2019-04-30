const jStat = require('jstat').jStat
const TimeHull = require('./TimeHull')

/**
 * A TimeHullSeries is an object that calculates a series of TimeHulls
 * @param {Object}    opt                               An options object
 * @param {Array}     opt.points                        Array of points. Points should include `timestamp`, `x`, and `y` properties. E.g. `[{ timestamp: 0, x: 532, y: 354 }, { timestamp: 100, x: 432, y: 754 }]`
 * @param {Number}    opt.period                        The duration (milliseconds) over which convex hulls are computed. All `TimeHull` durations will be less than or equal to `TimeHullSeries.period`.
 * @param {Number}    [opt.timestep = 0]                The minimum amount of time required (milliseconds) between the `endTime()` of the last computed `TimeHull` and the `endTime()` of the next computed `TimeHull`.
 * @param {Boolean}   [opt.includeIncomplete = false]   Set to `true` to include the initial convex hulls that are less than `TimeHullSeries.period`.
 * @param {Number}    [opt.width = 0]                   The width (px) of the area that the points were recorded in. This is not necessarily the width of a stimulus image, but it often is.
 * @param {Number}    [opt.height = 0]                  The height (px) of the area that the points were recorded in. This is not necessarily the height of a stimulus image, but it often is.
 */
class TimeHullSeries {
  constructor(opt) {
    opt = opt || {}

    if(typeof(opt.points) == 'undefined' || !opt.points.length) { throw new Error('noPoints') }
    if(opt.points.length < 3) { throw new Error('tooFewPoints') }

    if(typeof(opt.period) == 'undefined') { throw new Error('noPeriod') }

    this.points = opt.points.sort(function(a, b) {
      return a.timestamp - b.timestamp
    })

    this.period = opt.period
    this.timestep = opt.timestep || 0
    this.includeIncomplete = opt.includeIncomplete || false
    this.width = opt.width || 0
    this.height = opt.height || 0
  }

  /**
   * Gets the `coverage()` of the `TimeHulls`, averaged by each `TimeHull's` `duration`.
   * @return {Number} Proportion `[0:1]`. `0` means that no `TimeHull's` had any `coverage`, while `1` means that all of the `TimeHull's` in the `TimeHullSeries` had 100% `coverage`.
   */
  getAverageCoverage() {
    if(typeof(this.averageCoverage) == 'undefined') {
      let hulls = this.getHulls()
      let coverageDurations = hulls.map(hull => hull.coverageDuration())
      let durations = hulls.map(hull => hull.duration())

      let avg = 0

      if(jStat.sum(durations) > 0) {
        avg = jStat.sum(coverageDurations) / jStat.sum(durations)
      }

      this.averageCoverage = avg
    }

    return this.averageCoverage
  }

  /**
   * Gets the `centroid` of each `TimeHull` in the `TimeHullSeries`
   * @param {Object}    [opt = {}]      An options object
   * @param {TimeHull}  [opt.hull]      The last `hull` to calculate a centroid for.
   * @param {Number}    [opt.hullIndex] The index of the last `hull` to calculate a centroid for.
   * @param {String}    [opt.which]     The name of the property to return from each centroid. E.g. `'x'`.
   * @return {Array}    The `centroid` of each `TimeHull` in the `TimeHullSeries`. If `hull` or `hullIndex` are provided then truncate the array at the specified `hull`. If `which` is provided then map only that property.
   */
  getCentroids(opt) {
    opt       = opt || {}
    let which = opt.which

    let hull

    try {
      hull = this.getHull(opt)
    }
    catch(e) {
      if(e.message == 'noHullSpecified') {
        let hulls = this.getHulls()
        hull = hulls[hulls.length - 1]
      }
    }

    if(!this.centroids) {
      this.centroids = this.getHulls().map(h => h.centroid())
    }

    let centroids = this.centroids.slice(0, hull.number)

    if(typeof(which) != 'undefined') {
      return centroids.map(centroid => centroid[which])
    } else {
      return centroids
    }
  }

  /**
   * [getEndPointIndex description]
   * @param  {Number} startIndex [description]
   * @return {Number}            [description]
   */
  getEndPointIndex(startIndex) {
    if(!this.points[startIndex]) { throw new Error('startIndexOutOfBounds') }

    let startTime = this.points[startIndex].timestamp
    let endIndex = startIndex
    let duration = 0

    while (duration < this.period) {
      endIndex++
      if(this.points[endIndex]) {
        let endTime = this.points[endIndex].timestamp
        duration = endTime - startTime
      } else {
        return undefined
      }
    }

    if(duration == this.period) {
      return endIndex
    } else {
      return endIndex - 1
    }
  }

  /**
   * [getDuration description]
   * @return {Number} [description]
   */
  getDuration() {
    if(typeof(this.duration) == 'undefined') {
      this.duration = this.points[this.points.length - 1].timestamp - this.points[0].timestamp
    }

    return this.duration
  }

  /**
   * [getHull description]
   * @param {Object}    [opt = {}]      An options object
   * @param {TimeHull}  [opt.hull]      The last `hull` to calculate a centroid for.
   * @param {Number}    [opt.hullIndex] The index of the last `hull` to calculate a centroid for.
   * @return {TimeHull}                 [description]
   */
  getHull(opt) {
    opt = opt || {}

    if(typeof(opt.hull) == 'undefined' && typeof(opt.hullIndex) == 'undefined') {
      throw new Error('noHullSpecified')
    }

    let hull

    if(opt.hull) {
      if(opt.hull.constructor.name != 'TimeHull') {
        throw new Error('invalidHull')
      } else {
        hull = opt.hull
      }
    } else {
      if(typeof(opt.hullIndex) != 'number') {
        throw new Error('invalidHullIndex')
      }

      let hulls = this.getHulls()
      if(!hulls[opt.hullIndex]) {
        throw new Error('hullIndexOutOfBounds')
      } else {
        hull = hulls[opt.hullIndex]
      }
    }

    return hull
  }

  /**
   * [getHulls description]
   * @return {Array} An array of `TimeHull` objects
   */
  getHulls() {
    if(typeof(this.hulls) == 'undefined') {
      let hulls = []

      let lastEndIndex
      let endIndex = (this.points.length - 1)
      let startIndex = (this.points.length - 1)

      for(endIndex; startIndex >= 0 && endIndex > 1; endIndex--) {
        startIndex = this.getStartPointIndex(endIndex)

        if(typeof(startIndex) == 'undefined' && this.includeIncomplete) startIndex = 0

        if(startIndex >= 0) {
          if(typeof(lastEndIndex) == 'undefined' || this.points[lastEndIndex].timestamp - this.points[endIndex].timestamp >= this.timestep) {
            lastEndIndex = endIndex

            let h = new TimeHull({
              series: this,
              seriesPoints: this.points,
              startIndex: startIndex,
              endIndex: endIndex,
              width: this.width,
              height: this.height,
            })
            hulls.push(h)
          }
        }
      }

      hulls = hulls.reverse()
      for(let i = 0 ; i < hulls.length; i++) { hulls[i].number = i + 1 }

      this.hulls = hulls
    }

    return this.hulls
  }

  /**
   * [getStartPointIndex description]
   * @param  {Number} endIndex [description]
   * @return {Number}          [description]
   */
  getStartPointIndex(endIndex) {
    if(!this.points[endIndex]) { throw new Error('endIndexOutOfBounds') }

    let endTime = this.points[endIndex].timestamp
    let startIndex = endIndex
    let duration = 0

    while (duration < this.period) {
      startIndex--
      if(this.points[startIndex]) {
        let startTime = this.points[startIndex].timestamp
        duration = endTime - startTime
      } else {
        break
      }
    }

    if(duration == this.period) {
      return startIndex
    } else if(duration > this.period) {
      return startIndex + 1
    }
  }
}

module.exports = TimeHullSeries
