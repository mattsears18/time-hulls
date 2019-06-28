const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getFinalCoverage()', () => {
  const points = [
    { x: 100, y: 400, timestamp: 0 },
    { x: 200, y: 300, timestamp: 1000 },
    { x: 300, y: 200, timestamp: 2000 },
    { x: 400, y: 100, timestamp: 3000 },
    { x: 500, y: 700, timestamp: 4000 },
    { x: 600, y: 600, timestamp: 5000 },
    { x: 700, y: 500, timestamp: 6000 },
    { x: 800, y: 400, timestamp: 7000 },
    { x: 900, y: 300, timestamp: 8000 },
    { x: 100, y: 100, timestamp: 9000 }, //
    { x: 0, y: 100, timestamp: 10000 }, //
    { x: 0, y: 0, timestamp: 11000 }, //
    { x: 100, y: 0, timestamp: 12000 }, //
    { x: 100, y: 100, timestamp: 13000 }, //
    { x: 0, y: 100, timestamp: 14000 } // coverage: 100 * 100 / 1000 / 1000 = 0.01
  ];

  test('has no finalCoverage without any hulls', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getFinalCoverage()).toEqual(0);
  });

  test('gets the final coverage', () => {
    const series = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 0,
      width: 1000,
      height: 1000
    });

    expect(series.getFinalCoverage()).toBe(0.01);
  });

  test('gets a previously cached finalCoverage', () => {
    const series = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 0,
      width: 1000,
      height: 1000
    });

    series.finalCoverage = 1337;

    expect(series.getFinalCoverage()).toBe(1337);
  });
});
