const TimeHullSeries  = require('../../lib/TimeHullSeries');
var expect            = require('chai').expect;

describe('TimeHullSeries.getEndPointIndex()', () => {
  it('gets the end indices', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8001 },
      { x: 100, y: 100, timestamp: 9000 },
    ];

    let hullSeries = new TimeHullSeries({
      points: points,
      period: 5000,
    });

    expect(hullSeries.getEndPointIndex(0)).to.equal(5);
    expect(hullSeries.getEndPointIndex(3)).to.equal(7);
  });

  it('returns the last point when it runs out of points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8001 },
      { x: 100, y: 100, timestamp: 9000 },
    ];

    let hullSeries = new TimeHullSeries({
      points: points,
      period: 5000,
    });

    expect(hullSeries.getEndPointIndex(7)).to.equal(9);
    expect(hullSeries.getEndPointIndex(9)).to.equal(9);
  });


  it('has a startIndex that is out of bounds', () => {
    let points = [{ x: 100, y: 100, timestamp: 0 }];
    let hullSeries = new TimeHullSeries({
      points: points,
      period: 5000,
    });

    expect(() => { hullSeries.getEndPointIndex(-1) }).to.throw('startIndexOutOfBounds');
    expect(() => { hullSeries.getEndPointIndex(1) }).to.throw('startIndexOutOfBounds');
    expect(() => { hullSeries.getEndPointIndex(20) }).to.throw('startIndexOutOfBounds');
  });
});
