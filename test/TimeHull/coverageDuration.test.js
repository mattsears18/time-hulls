const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.coverageDuration()', () => {
  it('has a coverageDuration', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 0, y: 100, timestamp: 3000 },
      { x: 30, y: 30, timestamp: 7000 },
      { x: 20, y: 20, timestamp: 8000 },
      { x: 50, y: 50, timestamp: 10000 },
      { x: 100, y: 100, timestamp: 12000 },
      { x: 100, y: 100, timestamp: 14000 },
    ];

    expect(new TimeHull({
      seriesPoints: points, width: 2000, height: 1000, startIndex: 0, endIndex: 1,
    }).coverageDuration({})).to.equal(0);
    expect(new TimeHull({
      seriesPoints: points, width: 2000, height: 1000, startIndex: 0, endIndex: 3,
    }).coverageDuration({})).to.equal(20);
    expect(new TimeHull({
      seriesPoints: points, width: 2000, height: 1000, startIndex: 0, endIndex: 6,
    }).coverageDuration({})).to.equal(10);
  });

  it('has a coverageDuration without passing options', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 0, y: 100, timestamp: 3000 },
      { x: 30, y: 30, timestamp: 7000 },
      { x: 20, y: 20, timestamp: 8000 },
      { x: 50, y: 50, timestamp: 10000 },
      { x: 100, y: 100, timestamp: 12000 },
      { x: 100, y: 100, timestamp: 14000 },
    ];

    expect(new TimeHull({
      seriesPoints: points, width: 2000, height: 1000, startIndex: 0, endIndex: 1,
    }).coverageDuration()).to.equal(0);
    expect(new TimeHull({
      seriesPoints: points, width: 2000, height: 1000, startIndex: 0, endIndex: 3,
    }).coverageDuration()).to.equal(20);
    expect(new TimeHull({
      seriesPoints: points, width: 2000, height: 1000, startIndex: 0, endIndex: 6,
    }).coverageDuration()).to.equal(10);
  });
});
