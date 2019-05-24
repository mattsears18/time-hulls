const { expect } = require('chai');
const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getStartTime()', () => {
  const points = [
    { x: 100, y: 100, timestamp: 1337 },
    { x: 100, y: 100, timestamp: 22000 },
    { x: 100, y: 100, timestamp: 23000 },
    { x: 100, y: 100, timestamp: 24000 },
    { x: 100, y: 100, timestamp: 25000 },
    { x: 100, y: 100, timestamp: 26000 },
    { x: 100, y: 100, timestamp: 27000 },
    { x: 100, y: 100, timestamp: 28001 },
    { x: 100, y: 100, timestamp: 29000 },
    { x: 100, y: 100, timestamp: 79000 }
  ];

  it('gets the timestamp of the first point that is actually in a hull', () => {
    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullSeries.getStartTime()).to.equal(22000);
  });
});
