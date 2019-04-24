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

  it('is undefined if the period is not met', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
    ];

    let hullSeries = new TimeHullSeries({
      points: points,
      period: 5000,
    });

    expect(hullSeries.getEndPointIndex(0)).to.be.an('undefined');
    expect(hullSeries.getEndPointIndex(2)).to.be.an('undefined');
  });

  it('gets a hull with a duration exactly equal to the period without a following point', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
    ];

    let hullSeries = new TimeHullSeries({
      points: points,
      period: 4000,
    });

    expect(hullSeries.getEndPointIndex(0)).to.equal(4);
    expect(hullSeries.getEndPointIndex(2)).to.be.an('undefined');
  });

  it('has a startIndex that is out of bounds', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
    ];
    let hullSeries = new TimeHullSeries({
      points: points,
      period: 5000,
    });

    expect(() => { hullSeries.getEndPointIndex(-1) }).to.throw('startIndexOutOfBounds');
    expect(() => { hullSeries.getEndPointIndex(3) }).to.throw('startIndexOutOfBounds');
    expect(() => { hullSeries.getEndPointIndex(20) }).to.throw('startIndexOutOfBounds');
  });
});
