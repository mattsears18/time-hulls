const { expect } = require('chai');
const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getEndPointIndex()', () => {
  it('gets the end indices', () => {
    const points = [
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

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
    });

    expect(hullSeries.getEndPointIndex(0)).to.equal(5);
    expect(hullSeries.getEndPointIndex(3)).to.equal(7);
  });

  it('is undefined if the period is not met', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
    });

    expect(hullSeries.getEndPointIndex(0)).to.be.an('undefined');
    expect(hullSeries.getEndPointIndex(2)).to.be.an('undefined');
  });

  it('gets a hull with a duration exactly equal to the period without a following point', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 4000,
    });

    expect(hullSeries.getEndPointIndex(0)).to.equal(4);
    expect(hullSeries.getEndPointIndex(2)).to.be.an('undefined');
  });

  it('has a startIndex that is out of bounds', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
    ];
    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
    });

    expect(() => { hullSeries.getEndPointIndex(-1); }).to.throw('startIndexOutOfBounds');
    expect(() => { hullSeries.getEndPointIndex(3); }).to.throw('startIndexOutOfBounds');
    expect(() => { hullSeries.getEndPointIndex(20); }).to.throw('startIndexOutOfBounds');
  });

  it('has a hull duration that is less than the period', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3500 },
      { x: 100, y: 100, timestamp: 4500 },
      { x: 100, y: 100, timestamp: 5500 },
      { x: 100, y: 100, timestamp: 6500 },
      { x: 100, y: 100, timestamp: 7500 },
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
    });

    expect(hullSeries.getEndPointIndex(0)).to.equal(4);
    expect(hullSeries.getEndPointIndex(2)).to.equal(6);
    expect(hullSeries.getEndPointIndex(3)).to.be.an('undefined');
  });
});
