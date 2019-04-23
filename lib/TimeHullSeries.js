const jStat = require('jStat').jStat;
const json2csv = require('json2csv').parse;
const TimeHull = require('./TimeHull');

class TimeHullSeries {
  constructor({
    points,
    period,
    timestep = 0,
    includeIncomplete = false,
    pointTrailLength,
    width = 0,
    height = 0,
  }) {
    if(typeof(points) == 'undefined' || !points.length) {
      throw new Error('noPoints');
    }

    this.points = points;
    this.period = period;
    this.timestep = timestep;
    this.includeIncomplete = includeIncomplete;
    this.pointTrailLength = pointTrailLength;
    this.width = width;
    this.height = height;
  }

  getAverageCoverage() {
    let hulls = this.getHulls();
    let coverageDurations = hulls.map(hull => hull.coverageDuration({}));
    let durations = hulls.map(hull => hull.duration());

    let avg = 0;

    if(jStat.sum(durations) > 0) {
      avg = jStat.sum(coverageDurations) / jStat.sum(durations);
    }

    return avg;
  }

  getCentroids({
    endIndex,
    which,
  }) {
    let hulls = this.getHulls()
    if(typeof(endIndex) != 'undefined') { hulls = hulls.slice(0, endIndex + 1) }
    return hulls.map(h => h.centroid({ which: which }));
  }

  // getCentroidTrailTrace({
  //   initial = false,
  //   endIndex,
  // }) {
  //   if(initial) {
  //     return {
  //       name: 'Centroid Trail',
  //       x: [-10, -11], // can't draw a line from 1 point, so have to send 2 points
  //       y: [-10, -11], // can't draw a line from 1 point, so have to send 2 points
  //       mode: 'lines',
  //       type: 'scatter',
  //       line: {
  //         color: '#dc3545',
  //         width: 2.5,
  //       },
  //     }
  //   } else {
  //     let xs = this.getCentroids({ endIndex: endIndex, which: 'x' });
  //     let ys = this.getCentroids({ endIndex: endIndex, which: 'y' });
  //
  //     if(xs.length == 1 || ys.length == 1) {
  //       xs = [-10, -11];
  //       ys = [-10, -11];
  //     }
  //
  //     return { x: xs, y: ys }
  //   }
  // }

  // getCSV() {
  //   let data = [];
  //   let hulls = this.getHulls();
  //
  //   hulls.forEach((hull, hi) => {
  //     let hullData = {
  //       link: Meteor.absoluteUrl() + 'studies/' + this.viewing().analysis().study()._id + '/viewings/' + this.viewing()._id,
  //       study: this.viewing().study().name,
  //       analysis: this.viewing().analysis().name,
  //       period: this.viewing().analysis().period,
  //       viewingGap: this.viewing().analysis().viewingGap,
  //       minViewingTime: this.viewing().analysis().minViewingTime,
  //       participant: this.viewing().participant().name,
  //       stimulus: hull.viewing().stimulus().name,
  //       viewingNumber: hull.viewing().number,
  //       stimulusWidth: hull.viewing().stimulus().width,
  //       stimulusHeight: hull.viewing().stimulus().height,
  //       stimulusArea: hull.viewing().stimulus().area(),
  //       hullNumber: hi + 1,
  //       period: this.viewing().analysis().period,
  //       startIndex: hull.startIndex,
  //       endIndex: hull.endIndex,
  //       startTime: hull.startTime(),
  //       endTime: hull.endTime(),
  //       hullPeriod: hull.period(),
  //       timeStep: hull.timeStep(),
  //       duration: hull.duration(),
  //       pointCount: hull.points().length,
  //       pointsX: hull.points('x'),
  //       pointsY: hull.points('y'),
  //       lastPointX: hull.lastPoint().x,
  //       lastPointY: hull.lastPoint().y,
  //       distance: hull.distance(),
  //       distanceX: hull.distance('x'),
  //       distanceY: hull.distance('y'),
  //       velocity: hull.velocity(),
  //       velocityX: hull.velocity('x'),
  //       velocityY: hull.velocity('y'),
  //       centroidX: hull.centroid({}).x,
  //       centroidY: hull.centroid({}).y,
  //       centroidDistance: 0,
  //       centroidDistanceX: 0,
  //       centroidDistanceY: 0,
  //       centroidVelocity: 0,
  //       centroidVelocityX: 0,
  //       centroidVelocityY: 0,
  //       coverage: hull.coverage({}),
  //       coverageDuration: hull.coverageDuration(),
  //       averageCoverage: this.viewing().averageSlideHullCoverage,
  //     }
  //
  //     if(hi > 0) {
  //       hullData.centroidDistanceX = (hulls[hi].centroid({}).x - hulls[hi - 1].centroid({}).x);
  //       hullData.centroidDistanceY = (hulls[hi].centroid({}).y - hulls[hi - 1].centroid({}).y);
  //       hullData.centroidDistance = Math.sqrt(hullData.centroidDistanceX * hullData.centroidDistanceX + hullData.centroidDistanceY * hullData.centroidDistanceY)
  //       if(hullData.timeStep > 0 && hullData.centroidDistance > 0) {
  //         hullData.centroidVelocity = (hullData.centroidDistance / hullData.timeStep);
  //         hullData.centroidVelocityX = (hullData.centroidDistanceX / hullData.timeStep);
  //         hullData.centroidVelocityY = (hullData.centroidDistanceY / hullData.timeStep);
  //       }
  //
  //     }
  //
  //     data.push(hullData);
  //   });
  //
  //   let csv;
  //
  //   try {
  //     csv = json2csv(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //
  //   return csv;
  // }

  getEndPointIndex(startIndex) {
    if(!this.points[startIndex]) { throw new Error('startIndexOutOfBounds') }

    let startTime = this.points[startIndex].timestamp;
    let endIndex = startIndex;
    let duration = 0;

    while (duration <= this.period) {
      endIndex++;
      if(this.points[endIndex]) {
        let endTime = this.points[endIndex].timestamp;
        duration = endTime - startTime;
      } else {
        break;
      }
    }
    return endIndex - 1;
  }

  getHulls() {
    let hulls = [];

    if(!this.points.length) { return hulls; }

    let firstHullEndIndex = this.getEndPointIndex(0);

    let firstHull = new TimeHull({
      seriesPoints: this.points,
      pointTrailLength: this.pointTrailLength,
      startIndex: 0,
      endIndex: firstHullEndIndex,
      width: this.width,
      height: this.height,
    });

    let endIndex;

    for(endIndex = (this.points.length - 1); endIndex > firstHullEndIndex; endIndex--) {
      let startIndex = this.getStartPointIndex(endIndex);
      let h = new TimeHull({
        seriesPoints: this.points,
        pointTrailLength: this.pointTrailLength,
        startIndex: startIndex,
        endIndex: endIndex,
        width: this.width,
        height: this.height,
      });
      hulls.push(h);
    }

    hulls.push(firstHull);
    hulls = hulls.reverse();

    return hulls;
  }

  // getLayout(options) {
  //   let forceHeight = 600;
  //   let scale = forceHeight / this.viewing().stimulus().stimulusfile().fileHeight;
  //   let margin = { l: 50, r: 10, b: 20, t: 0, pad: 4 };
  //
  //   return {
  //     xaxis: {
  //       range: [0, this.viewing().stimulus().width],
  //       showticklabels: true,
  //     },
  //     yaxis: {
  //       range: [0, this.viewing().stimulus().height],
  //       showticklabels: true,
  //     },
  //     height: forceHeight + margin.b + margin.t,
  //     width: (this.viewing().stimulus().stimulusfile().fileWidth * scale) + margin.l + margin.r + 146,
  //     margin: margin,
  //     images: [{
  //       source: Stimulusfiles.link(this.viewing().stimulus().stimulusfile()),
  //       xref: 'paper',
  //       yref: 'paper',
  //       x: 0,
  //       y: 0,
  //       sizex: 1,
  //       sizey: 1,
  //       sizing: 'stretch',
  //       xanchor: 'left',
  //       yanchor: 'bottom',
  //       layer: 'below',
  //     }],
  //     hovermode: 'closest',
  //   }
  // }

  getStartPointIndex(endIndex) {
    if(!this.points[endIndex]) { throw new Error('endIndexOutOfBounds') }

    let endTime = this.points[endIndex].timestamp;
    let startIndex = endIndex;
    let duration = 0;

    while (duration <= this.period) {
      startIndex--;
      if(this.points[startIndex]) {
        let startTime = this.points[startIndex].timestamp;
        duration = endTime - startTime;
      } else {
        break;
      }
    }
    return startIndex + 1;
  }

  // getTraces({
  //   initial = false,
  // }) {
  //   if(initial) {
  //     let hull = this.getHulls()[0];
  //
  //     return [
  //       this.getCentroidTrailTrace({      initial: true }),
  //       hull.getPointsTrace({             initial: true }),
  //       hull.getLastPointTrailTrace({     initial: true }),
  //       hull.getPolygonTrace({            initial: true }),
  //       hull.getCentroidTrace({           initial: true }),
  //       hull.getLastPointTrace({          initial: true }),
  //     ];
  //   } else {
  //     let hulls = this.getHulls();
  //     let frames = [];
  //
  //     hulls.forEach((hull, hi) => {
  //       let frame = {
  //         name: hull.endTime(),
  //         data: [
  //           this.getCentroidTrailTrace({ endIndex: hi }),
  //           hull.getPointsTrace({}),
  //           hull.getLastPointTrailTrace({}),
  //           hull.getPolygonTrace({}),
  //           hull.getCentroidTrace({}),
  //           hull.getLastPointTrace({}),
  //         ],
  //       }
  //
  //       frames.push(frame);
  //     });
  //
  //     return frames;
  //   }
  // }
}

module.exports = TimeHullSeries;
