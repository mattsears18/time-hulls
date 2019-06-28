const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getDuration()', () => {
  test('has no duration', () => {
    const noHullPoints = [{ x: 100, y: 100, timestamp: 0 }];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getDuration()).toEqual(0);
  });

  test('has a duration even without any hulls', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 }
    ];

    const series = new TimeHullSeries({ points, period: 1000 });

    expect(series.getDuration()).toBe(1000);
  });

  test('has a duration', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 1000 },
      { x: 300, y: 200, timestamp: 2000 },
      { x: 400, y: 100, timestamp: 3000 },
      { x: 500, y: 700, timestamp: 4000 }
    ];

    const series = new TimeHullSeries({ points, period: 5000 });

    expect(series.getDuration()).toBe(4000);
  });

  test('has a duration of zero', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 0 },
      { x: 300, y: 200, timestamp: 0 },
      { x: 400, y: 100, timestamp: 0 },
      { x: 500, y: 700, timestamp: 0 }
    ];

    const series = new TimeHullSeries({ points, period: 5000 });
    expect(series.getDuration()).toBe(0);
  });

  test('gets a previously saved duration', () => {
    const points = [
      { x: 100, y: 400, timestamp: 0 },
      { x: 200, y: 300, timestamp: 0 },
      { x: 300, y: 200, timestamp: 0 },
      { x: 400, y: 100, timestamp: 0 },
      { x: 500, y: 700, timestamp: 0 }
    ];

    const series = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 0
    });

    series.duration = 1337;
    expect(series.getDuration()).toBe(1337);
  });
});
