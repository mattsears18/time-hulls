const { expect } = require('chai');
const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getStartTime()', () => {
  const points = [
    { x: 100, y: 100, timestamp: 1337 },
    { x: 100, y: 100, timestamp: 2000 },
    { x: 100, y: 100, timestamp: 3000 },
    { x: 100, y: 100, timestamp: 4000 },
    { x: 100, y: 100, timestamp: 5000 },
    { x: 100, y: 100, timestamp: 6000 },
    { x: 100, y: 100, timestamp: 7000 },
    { x: 100, y: 100, timestamp: 8001 },
    { x: 100, y: 100, timestamp: 9000 },
  ];

  it('gets the start time', () => {
    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
    });

    expect(hullSeries.getStartTime()).to.equal(1337);
  });
});
