const TimeHullSeries = require('../../lib/TimeHullSeries');

test('has no hullDurations when no hulls are generated', () => {
  const noHullPoints = [
    { x: 100, y: 100, timestamp: 0 },
    { x: 100, y: 100, timestamp: 1000 }
  ];

  const noHullSeries = new TimeHullSeries({
    points: noHullPoints,
    period: 100,
    includeIncomplete: false
  });

  expect(noHullSeries.getHullDurations()).toEqual([]);
});

describe('TimeHullSeries.getHullDurations()', () => {
  const points = [
    { x: 100, y: 100, timestamp: 21500 }, // 0
    { x: 100, y: 100, timestamp: 22000 }, // 01
    { x: 100, y: 100, timestamp: 23000 }, // 01
    { x: 100, y: 100, timestamp: 24000 }, // 0123
    { x: 100, y: 100, timestamp: 25000 }, // 01234
    { x: 100, y: 100, timestamp: 26000 }, // 01234      1000
    { x: 100, y: 100, timestamp: 27000 }, //  1234      1001
    { x: 100, y: 100, timestamp: 28001 }, //   234      999
    { x: 100, y: 100, timestamp: 29000 }, //    34      50
    { x: 100, y: 100, timestamp: 29050 } //      4      0
  ];

  test('gets the hull durations', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000,
      includeIncomplete: false
    });

    expect(hullseries.getHullDurations()).toEqual([1000, 1001, 999, 50, 0]);
  });
});
