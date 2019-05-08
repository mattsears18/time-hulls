const { jStat } = require("jStat");
const TimeHull = require("./TimeHull");

/**
 * A TimeHullSeries is an object that calculates a series of TimeHulls
 * @param {Object}    opt
 * An options object
 * @param {Array}     opt.points
 * Array of points. Points should include `timestamp`, `x`, and `y` properties.
 * E.g. `[{ timestamp: 0, x: 532, y: 354 }, { timestamp: 100, x: 432, y: 754 }]`
 * @param {Number}    opt.period
 * The duration (milliseconds) over which convex hulls are computed. All
 * `TimeHull` durations will be less than or equal to `TimeHullSeries.period`.
 * @param {Number}    [opt.timestep = 0]
 * The minimum amount of time required (milliseconds) between the `endTime()`
 * of the last computed `TimeHull` and the `endTime()` of the next computed
 * `TimeHull`.
 * @param {Boolean}   [opt.includeIncomplete = false]
 * Set to `true` to include the initial convex hulls that are less than
 * `TimeHullSeries.period`.
 * @param {Number}    [opt.width = 0]
 * The width (px) of the area that the points were recorded in. This is not
 * necessarily the width of a stimulus image, but it often is.
 * @param {Number}    [opt.height = 0]
 * The height (px) of the area that the points were recorded in. This is not
 * necessarily the height of a stimulus image, but it often is.
 */
class TimeHullSeries {
  constructor(opt) {
    const { points, period, timestep, includeIncomplete, width, height } =
      opt || {};

    if (typeof points === "undefined" || !points.length) {
      throw new Error("noPoints");
    }

    if (points.length < 3) {
      throw new Error("tooFewPoints");
    }

    if (typeof period === "undefined") {
      throw new Error("noPeriod");
    }

    this.points = points.sort((a, b) => a.timestamp - b.timestamp);

    this.period = period;
    this.timestep = timestep || 0;
    this.includeIncomplete = includeIncomplete || false;
    this.width = width || 0;
    this.height = height || 0;
  }

  /**
   * Gets the `coverage()` of the `TimeHulls`, averaged by each `TimeHull's`
   * `duration`.
   * @return {Number}
   * Proportion `[0:1]`. `0` means that no `TimeHull's` had any `coverage`,
   * while `1` means that all of the `TimeHull's` in the `TimeHullSeries` had
   * 100% `coverage`.
   */
  getAverageCoverage() {
    if (typeof this.averageCoverage === "undefined") {
      const hulls = this.getHulls();
      const coverageDurations = hulls.map(hull => hull.coverageDuration());
      const durations = hulls.map(hull => hull.duration());

      let avg = 0;

      if (jStat.sum(durations) > 0) {
        avg = jStat.sum(coverageDurations) / jStat.sum(durations);
      }

      this.averageCoverage = avg;
    }

    return this.averageCoverage;
  }

  /**
   * Gets the `centroid` of each `TimeHull` in the `TimeHullSeries`
   * @param {Object}    [opt = {}]      An options object
   * @param {TimeHull}  [opt.hull]      The last `hull` to calculate a centroid for.
   * @param {Number}    [opt.hullIndex] The index of the last `hull` to calculate a centroid for.
   * @param {String}    [opt.which]
   * The name of the property to return from each centroid. E.g. `'x'`.
   * @return {Array}
   * The `centroid` of each `TimeHull` in the `TimeHullSeries`. If `hull` or
   * `hullIndex` are provided then truncate the array at the specified `hull`.
   * If `which` is provided then map only that property.
   */
  getCentroids(opt) {
    const { which } = opt || {};

    let hull;

    try {
      hull = this.getHull(opt);
    } catch (e) {
      if (e.message === "noHullSpecified") {
        const hulls = this.getHulls();
        hull = hulls[hulls.length - 1];
      }
    }

    if (!this.centroids) {
      this.centroids = this.getHulls().map(h => h.centroid());
    }

    const centroids = this.centroids.slice(0, hull.number);

    if (typeof which !== "undefined") {
      return centroids.map(centroid => centroid[which]);
    }
    return centroids;
  }

  /**
   * [getDuration description]
   * @return {Number} [description]
   */
  getDuration() {
    if (typeof this.duration === "undefined") {
      this.duration =
        this.points[this.points.length - 1].timestamp -
        this.points[0].timestamp;
    }

    return this.duration;
  }

  /**
   * [getEndPointIndex description]
   * @param  {Number} startIndex [description]
   * @return {Number}            [description]
   */
  getEndPointIndex(startIndex) {
    if (!this.points[startIndex]) {
      throw new Error("startIndexOutOfBounds");
    }

    const startTime = this.points[startIndex].timestamp;
    let endIndex = startIndex;
    let duration = 0;

    while (duration < this.period) {
      endIndex += 1;
      if (this.points[endIndex]) {
        const endTime = this.points[endIndex].timestamp;
        duration = endTime - startTime;
      } else {
        return undefined;
      }
    }

    if (duration === this.period) {
      return endIndex;
    }
    return endIndex - 1;
  }

  /**
   *
   * @returns {Number} The timestamp of the last point in the TimeHullSeries
   */
  getEndTime() {
    return this.points[this.points.length - 1].timestamp;
  }

  /**
   * [getHull description]
   * @param {Object}    [opt = {}]      An options object
   * @param {TimeHull}  [opt.hull]      The last `hull` to calculate a centroid for.
   * @param {Number}    [opt.hullIndex] The index of the last `hull` to calculate a centroid for.
   * @return {TimeHull}                 [description]
   */
  getHull(opt) {
    const { hullIndex } = opt || {};
    let { hull } = opt || {};

    if (typeof hull === "undefined" && typeof hullIndex === "undefined") {
      throw new Error("noHullSpecified");
    }

    if (!hull) {
      if (typeof hullIndex !== "number") {
        throw new Error("invalidHullIndex");
      }

      const hulls = this.getHulls();
      if (!hulls[hullIndex]) {
        throw new Error("hullIndexOutOfBounds");
      } else {
        hull = hulls[hullIndex];
      }
    }

    if (hull.constructor.name !== "TimeHull") {
      throw new Error("invalidHull");
    }

    return hull;
  }

  /**
   * [getHulls description]
   * @return {Array} An array of `TimeHull` objects
   */
  getHulls() {
    if (typeof this.hulls === "undefined") {
      const hulls = [];

      let lastEndIndex;
      let endIndex = this.points.length - 1;
      let startIndex = this.points.length - 1;

      for (endIndex; startIndex >= 0 && endIndex > 1; endIndex -= 1) {
        startIndex = this.getStartPointIndex(endIndex);

        if (typeof startIndex === "undefined" && this.includeIncomplete)
          startIndex = 0;

        if (startIndex >= 0) {
          if (
            typeof lastEndIndex === "undefined" ||
            this.points[lastEndIndex].timestamp -
              this.points[endIndex].timestamp >=
              this.timestep
          ) {
            lastEndIndex = endIndex;

            const h = new TimeHull({
              series: this,
              seriesPoints: this.points,
              startIndex,
              endIndex,
              width: this.width,
              height: this.height
            });
            hulls.push(h);
          }
        }
      }

      hulls.reverse();
      for (let i = 0; i < hulls.length; i += 1) {
        hulls[i].number = i + 1;
      }

      this.hulls = hulls;
    }

    return this.hulls;
  }

  /**
   * [getStartPointIndex description]
   * @param  {Number} endIndex [description]
   * @return {Number}          [description]
   */
  getStartPointIndex(endIndex) {
    if (!this.points[endIndex]) {
      throw new Error("endIndexOutOfBounds");
    }

    const endTime = this.points[endIndex].timestamp;
    let startIndex = endIndex;
    let duration = 0;

    while (duration < this.period) {
      startIndex -= 1;
      if (this.points[startIndex]) {
        const startTime = this.points[startIndex].timestamp;
        duration = endTime - startTime;
      } else {
        break;
      }
    }

    if (duration === this.period) {
      return startIndex;
    }
    if (duration > this.period) {
      return startIndex + 1;
    }

    return undefined;
  }

  /**
   *
   * @returns {Number} The timestamp of the first point in the TimeHullSeries
   */
  getStartTime() {
    return this.points[0].timestamp;
  }
}

module.exports = TimeHullSeries;
