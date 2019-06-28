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

  test('gets the timestamp of the first point that is actually in a hull', () => {
    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullSeries.getStartTime()).toBe(22000);
  });

  test('has no startTime without any hulls', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getStartTime()).toEqual(undefined);
  });
});
