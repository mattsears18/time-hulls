const jStat = require('jstat').jStat;
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

    if(points.length < 3) {
      throw new Error('tooFewPoints');
    }

    this.points = points.sort(function(a, b) {
      return a.timestamp - b.timestamp;
    });

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

  getEndPointIndex(startIndex) {
    if(!this.points[startIndex]) { throw new Error('startIndexOutOfBounds') }

    let startTime = this.points[startIndex].timestamp;
    let endIndex = startIndex;
    let duration = 0;

    while (duration < this.period) {
      endIndex++;
      if(this.points[endIndex]) {
        let endTime = this.points[endIndex].timestamp;
        duration = endTime - startTime;
      } else {
        return undefined;
      }
    }

    if(duration == this.period) {
      return endIndex;
    } else if(duration > this.period) {
      return endIndex - 1;
    }
  }

  getDuration() {
    return this.points[this.points.length - 1].timestamp - this.points[0].timestamp;
  }

  getHulls() {
    let hulls = [];

    let lastEndIndex;
    let endIndex = (this.points.length - 1);
    let startIndex = (this.points.length - 1);

    for(endIndex; startIndex >= 0 && endIndex > 1; endIndex--) {

      startIndex = this.getStartPointIndex(endIndex);

      if(typeof(startIndex) == 'undefined' && this.includeIncomplete) startIndex = 0;

      if(startIndex >= 0) {
        if(typeof(lastEndIndex) == 'undefined' || this.points[lastEndIndex].timestamp - this.points[endIndex].timestamp >= this.timestep) {
          lastEndIndex = endIndex;

          let h = new TimeHull({
            seriesPoints: this.points,
            pointTrailLength: this.pointTrailLength,
            startIndex: startIndex,
            endIndex: endIndex,
            width: this.width,
            height: this.height,
          });
          hulls.push(h);

          // console.log(startIndex + ' : ' + endIndex + ' make hull');
        } else {
          // console.log(startIndex + ' : ' + endIndex);
        }
      }
    }

    hulls = hulls.reverse();
    return hulls;
  }

  getStartPointIndex(endIndex) {
    if(!this.points[endIndex]) { throw new Error('endIndexOutOfBounds') }

    let endTime = this.points[endIndex].timestamp;
    let startIndex = endIndex;
    let duration = 0;

    while (duration < this.period) {
      startIndex--;
      if(this.points[startIndex]) {
        let startTime = this.points[startIndex].timestamp;
        duration = endTime - startTime;
      } else {
        break;
      }
    }

    if(duration == this.period) {
      return startIndex;
    } else if(duration > this.period) {
      return startIndex + 1;
    }
  }
}

module.exports = TimeHullSeries;
