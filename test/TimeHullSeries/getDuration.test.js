const TimeHullSeries  = require('../../lib/TimeHullSeries');
var expect            = require('chai').expect;

describe('TimeHullSeries.getDuration()', () => {
  it('has a duration', () => {
    let points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
      { x: 500, y: 700, timestamp: 4000 },
    ];

    let series = new TimeHullSeries({
      points: points,
    });

    expect(series.getDuration()).to.equal(4000);
  });

  it('has a duration of zero', () => {
    let points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 0 },
      { x: 300, y: 200, timestamp: 0 },
      { x: 400, y: 100, timestamp: 0 },
      { x: 500, y: 700, timestamp: 0 },
    ];

    let series = new TimeHullSeries({ points: points });
    expect(series.getDuration()).to.equal(0);
  });
});
