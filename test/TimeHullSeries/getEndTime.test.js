const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getEndTime()', () => {
  const points = [
    { x: 100, y: 100, timestamp: 1337 },
    { x: 100, y: 100, timestamp: 2000 },
    { x: 100, y: 100, timestamp: 3000 },
    { x: 100, y: 100, timestamp: 4000 },
    { x: 100, y: 100, timestamp: 5000 },
    { x: 100, y: 100, timestamp: 6000 },
    { x: 100, y: 100, timestamp: 7000 },
    { x: 100, y: 100, timestamp: 8001 },
    { x: 100, y: 100, timestamp: 9000 }
  ];

  test('gets the end time', () => {
    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullSeries.getEndTime()).toBe(9000);
  });

  test('has no endTime without any hulls', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getEndTime()).toEqual(undefined);
  });
});
