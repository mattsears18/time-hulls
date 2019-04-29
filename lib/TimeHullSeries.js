const jStat = require('jstat').jStat
const TimeHull = require('./TimeHull')

class TimeHullSeries {
  constructor(opt) {
    opt         = opt || {}

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

  getAverageCoverage() {
    let hulls = this.getHulls()
    let coverageDurations = hulls.map(hull => hull.coverageDuration({}))
    let durations = hulls.map(hull => hull.duration())

    let avg = 0

    if(jStat.sum(durations) > 0) {
      avg = jStat.sum(coverageDurations) / jStat.sum(durations)
    }

    return avg
  }

  getCentroids(opt) {
    opt = opt || {}
    let endHullIndex  = opt.endHullIndex
    let which         = opt.which

    if(!this.centroids) {
      this.centroids = this.getHulls().map(h => h.centroid())
    }

    if(typeof(endHullIndex) == 'undefined') { endHullIndex = this.centroids.length - 1 }

    let centroids = this.centroids.slice(0, endHullIndex + 1)

    if(typeof(which) != 'undefined') {
      return centroids.map(centroid => centroid[which])
    } else {
      return centroids
    }
  }

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

  getDuration() {
    return this.points[this.points.length - 1].timestamp - this.points[0].timestamp
  }

  getHulls() {
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

    return hulls
  }

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
