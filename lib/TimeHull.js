const areaPolygon = require('area-polygon');
const hull = require('hull.js');

/**
 * [TimeHull description]
 * @param {Object}  opt - An options object
 * @param {Array}   opt.seriesPoints - All points in the `TimeHullSeries`
 * @param {Number}  [opt.startIndex = 0] - [description]
 * @param {Number}  [opt.endIndex = opt.seriesPoints.length - 1] - [description]
 * @param {Number}  [opt.width = 0] - [description]
 * @param {Number}  [opt.height = 0] - [description]
 */
class TimeHull {
  constructor(opt) {
    const {
      seriesPoints, width, height, startIndex, endIndex,
    } = opt || {};

    if (typeof (seriesPoints) === 'undefined' || !seriesPoints.length) {
      throw new Error('noSeriesPoints');
    }

    this.seriesPoints = () => seriesPoints;

    this.width = width || 0;
    this.height = height || 0;
    this.startIndex = startIndex || 0;
    this.endIndex = endIndex || seriesPoints.length - 1;
    this.points = this.getSlicedPoints();
    this.name = this.endTime();

    this.duration = () => {
      if (seriesPoints[this.endIndex + 1]) {
        return (seriesPoints[this.endIndex + 1].timestamp - this.endTime());
      }
      return 0;
    };
  }

  /**
   * [area description]
   * @param {Object}    opt                           An options object
   * @param {Array}     [opt.points = this.points]    [description]
   * @return {Number}                                 [description]
   */
  area(opt) {
    const points = (opt && opt.points) || this.points;

    const perimeterPoints = TimeHull.distinctPoints(this.polygon({ points }));
    if (perimeterPoints.length < 3) return 0;
    return areaPolygon(perimeterPoints);
  }

  /**
   * [azimuth description]
   * @return {Number} [description]
   */
  azimuth() {
    let azimuth;
    if (this.points && this.points.length > 1) {
      const start = this.points[this.points.length - 2];
      const end = this.points[this.points.length - 1];

      if (start.x === end.x && start.y === end.y) {
        azimuth = 0;
      } else {
        azimuth = 90 - Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;

        if (azimuth < 0) {
          azimuth += 360;
        }
      }
    }

    return azimuth;
  }

  /**
   * [calculateCentroid description]
   * @param  {Array}  points [description]
   * @return {Object}        The centroid of `points` `{ x: Number, y: Number }`
   */
  static calculateCentroid(points) {
    const pts = points.slice();

    if (pts.length === 1) {
      return { x: pts[0].x, y: pts[0].y };
    }
    // https://stackoverflow.com/questions/9692448/how-can-you-find-the-centroid-of-a-concave-irregular-polygon-in-javascript
    const first = pts[0]; const
      last = pts[pts.length - 1];
    if (first.x !== last.x || first.y !== last.y) pts.push(first);
    let twicearea = 0;
    let x = 0; let y = 0;
    const nPts = pts.length;
    let p1; let p2; let
      f;
    for (let i = 0, j = nPts - 1; i < nPts; i += 1) {
      p1 = pts[i]; p2 = pts[j];
      f = p1.x * p2.y - p2.x * p1.y;
      twicearea += f;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
      j = i;
    }
    f = twicearea * 3;
    return { x: x / f, y: y / f };
  }

  /**
   * [centroid description]
   * @param  {Object} [opt = {}]                  [description]
   * @param  {Array}  [opt.points = this.points]  [description]
   * @param  {String} [opt.which]                 [description]
   * @return {Object}                             [description]
   */
  centroid(opt) {
    const { which } = opt || {};
    let { points } = opt || {};

    points = points || this.points;

    let centroid;

    if (points.length === 1) centroid = { x: points[0].x, y: points[0].y };
    if (points.length === 2) {
      centroid = {
        x: (points[0].x + points[1].x) / 2,
        y: (points[0].y + points[1].y) / 2,
      };
    }

    if (points.length > 2) {
      const perimeterPoints = TimeHull.distinctPoints(this.polygon({ points }));
      centroid = TimeHull.calculateCentroid(perimeterPoints);
    }

    if (typeof (which) !== 'undefined' && typeof (centroid) !== 'undefined') {
      return centroid[which];
    }
    return centroid;
  }

  /**
   * [coordinatesToXY description]
   * @param  {Array} points [description]
   * @return {Array}        [description]
   */
  static coordinatesToXY(points) {
    return points.map(point => ({ x: point[0], y: point[1] }));
  }

  /**
   * [coverage description]
   * @param {Object}  [opt = {}]    An options object
   * @param {Array}   [opt.points = this.points]  [description]
   * @param {Number}  [opt.width]   [description]
   * @param {Number}  [opt.height]  [description]
   * @return {Number}               [description]
   */
  coverage(opt) {
    const points = (opt && opt.points) || this.points;
    const width = (opt && opt.width) || this.width;
    const height = (opt && opt.height) || this.height;

    const area = this.area({ points });
    if (area === 0) return 0;
    if (width * height === 0) throw new Error('noStimulusArea');
    return area / (width * height);
  }

  /**
   * [coverageDuration description]
   * @param  {Object} opt [description]
   * @return {Number}     [description]
   */
  coverageDuration(opt) {
    return (this.coverage(opt) * this.duration());
  }

  /**
   * [coveragePercent description]
   * @param  {Object} [opt = {}]                  [description]
   * @param  {Array}  [opt.points = this.points]  [description]
   * @return {Number}                             [description]
   */
  coveragePercent(opt) {
    const points = (opt && opt.points) || this.points;
    return (this.coverage({ points }) * 100);
  }

  /**
   * [distance description]
   * @param  {String} [which] [description]
   * @return {Number}         [description]
   */
  distance(which) {
    if (typeof (which) !== 'undefined') {
      if (this.points && this.points.length > 1) {
        return (this.points[this.points.length - 1][which]
          - this.points[this.points.length - 2][which]);
      }
      return 0;
    }
    return Math.sqrt((this.distance('x') * this.distance('x') + this.distance('y') * this.distance('y')));
  }

  /**
   * [distinctPoints description]
   * @param  {Array}  points  [description]
   * @return {Array}          [description]
   */
  static distinctPoints(points) {
    const distinct = [];
    for (let i = 0; i < points.length; i += 1) {
      if (distinct.findIndex(e => (e.x === points[i].x && e.y === points[i].y)) < 0) {
        distinct.push(points[i]);
      }
    }
    return distinct;
  }

  /**
   * [endTime description]
   * @return {Number} [description]
   */
  endTime() {
    return this.points[this.points.length - 1].timestamp;
  }

  /**
   * [getPoints description]
   * @param  {String} [which] [description]
   * @return {Array}          [description]
   */
  getPoints(which) {
    if (typeof (which) !== 'undefined') {
      return this.points.map(point => point[which]);
    }
    return this.points;
  }

  /**
   * [getSlicedPoints description]
   * @param  {String} [which] [description]
   * @return {Array}          [description]
   */
  getSlicedPoints(which) {
    const points = this.seriesPoints().slice(this.startIndex, this.endIndex + 1);
    if (typeof (which) !== 'undefined') {
      return points.map(point => point[which]);
    }
    return points;
  }

  /**
   * [lastPoint description]
   * @return {Object} [description]
   */
  lastPoint() {
    return this.points[this.points.length - 1];
  }

  /**
   * [period description]
   * @return {Number} [description]
   */
  period() {
    return (this.endTime() - this.startTime());
  }

  /**
   * [polygon description]
   * @param  {Object} [opt = {}]                  [description]
   * @param  {Array}  [opt.points = this.points]  [description]
   * @param  {String} [opt.which]                 [description]
   * @return {Array}                              [description]
   */
  polygon(opt) {
    const points = (opt && opt.points) || this.points;
    const { which } = opt || {};

    let hullPoints = hull(TimeHull.XYToCoordinates(points), Infinity);

    hullPoints = TimeHull.coordinatesToXY(hullPoints);

    if (typeof (which) !== 'undefined') {
      return hullPoints.map(point => point[which]);
    }
    return hullPoints;
  }

  /**
   * [startTime description]
   * @return {Number} [description]
   */
  startTime() {
    return this.points[0].timestamp;
  }

  /**
   * [timestep description]
   * @return {Number} [description]
   */
  timestep() {
    if (this.points && this.points.length > 1) {
      return (this.points[this.points.length - 1].timestamp
              - this.points[this.points.length - 2].timestamp);
    }
    return 0;
  }

  /**
   * [velocity description]
   * @param  {String} [which] [description]
   * @return {Number}         [description]
   */
  velocity(which) {
    if (this.timestep() > 0 && this.distance() > 0) {
      return (this.distance(which) / this.timestep());
    }
    return 0;
  }

  /**
   * [XYToCoordinates description]
   * @param  {Array} points [description]
   * @return {Array}        [description]
   */
  static XYToCoordinates(points) {
    return points.map(point => [point.x, point.y]);
  }
}

module.exports = TimeHull;
