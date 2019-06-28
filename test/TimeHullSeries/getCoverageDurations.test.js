const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getCoverageDurations()', () => {
  const points = [
    { x: 0, y: 0, timestamp: 21500 }, //     0
    { x: 100, y: 0, timestamp: 22000 }, //   01
    { x: 100, y: 100, timestamp: 23000 }, // 01
    { x: 0, y: 100, timestamp: 24000 }, //   0123
    { x: 0, y: 0, timestamp: 25000 }, //     01234
    { x: 100, y: 0, timestamp: 26000 }, //   01234    10000 / 1000 / 1000 * 1000 = 10
    { x: 100, y: 100, timestamp: 27000 }, //  1234    10000 / 1000 / 1000 * 1001 = 10.01
    { x: 0, y: 100, timestamp: 28001 }, //     234    10000 / 1000 / 1000 * 999  = 9.99
    { x: 100, y: 0, timestamp: 29000 }, //      34    10000 / 1000 / 1000 * 50   = 0.5
    { x: 100, y: 0, timestamp: 29050 } //        4    10000 / 1000 / 1000 * 0    = 0
  ];

  test('has no coverageDurations when no hulls are generated', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getCoverageDurations()).toEqual([]);
  });

  test('gets the hull coverageDurations', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000,
      includeIncomplete: false,
      width: 1000,
      height: 1000
    });

    expect(hullseries.getCoverageDurations()).toEqual([
      10,
      10.01,
      9.99,
      0.5,
      0
    ]);
  });

  test('gets cached coverageDurations', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000,
      includeIncomplete: false,
      width: 1000,
      height: 1000
    });

    hullseries.coverageDurations = 1337;

    expect(hullseries.getCoverageDurations()).toEqual(1337);
  });
});
