const TimeHullSeries  = require('../../lib/TimeHullSeries');
var expect            = require('chai').expect;

describe('TimeHullSeries.getAverageCoverage()', () => {
  it('gets the average coverage', () => {
    let points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
      { x: 500, y: 700, timestamp: 4000 },
      { x: 600, y: 600, timestamp: 5000 },    // duration: 1000, coverage: 140000 / 1000000 = 140
      { x: 700, y: 500, timestamp: 6000 },    // duration: 1000, coverage: 140000 / 1000000 = 140
      { x: 800, y: 400, timestamp: 7000 },    // duration: 1000, coverage: 140000 / 1000000 = 140
      { x: 900, y: 300, timestamp: 8000 },    // duration: 1000, coverage: 140000 / 1000000 = 140
      { x: 100, y: 200, timestamp: 9000 },    // duration: 1000, coverage: 180000 / 1000000 = 180
      { x: 200, y: 100, timestamp: 10000 },   // duration: 1000, coverage: 180000 / 1000000 = 180
      { x: 300, y: 400, timestamp: 11000 },   // duration: 1000, coverage: 165000 / 1000000 = 165
      { x: 400, y: 300, timestamp: 12000 },   // duration: 1000, coverage: 140000 / 1000000 = 140
      { x: 500, y: 200, timestamp: 13000 },   // duration: 1000, coverage: 115000 / 1000000 = 115
      { x: 600, y: 100, timestamp: 14000 },   // duration: 0, coverage:
    ];

    // total coverageDuration: 1340
    // total duration: 9000
    // average coverage: 1340 / 9000 = 0.148888888888889

    let series = new TimeHullSeries({
      points: points,
      period: 5000,
      timestep: 0,
      width: 1000,
      height: 1000,
    });

    expect(series.getAverageCoverage()).to.equal(1340/9000);
  });

  it('has no duration, so averageCoverage = 0', () => {
    let points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 0 },
      { x: 300, y: 200, timestamp: 0 },
      { x: 400, y: 100, timestamp: 0 },
      { x: 500, y: 700, timestamp: 0 },
    ];

    let series = new TimeHullSeries({
      points: points,
      period: 5000,
      timestep: 0,
    });

    expect(series.getAverageCoverage()).to.equal(0);
  });
});
