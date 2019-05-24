const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.constructor()', () => {
  test('creates a TimeHullSeries without passing options', () => {
    expect(() => new TimeHullSeries()).toThrowError('noPoints');
  });

  test('has undefined points', () => {
    expect(() => new TimeHullSeries({})).toThrowError('noPoints');
  });

  test('has empty points', () => {
    expect(() => new TimeHullSeries({ points: [] })).toThrowError('noPoints');
  });

  test('has too few points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
    ];

    expect(() => new TimeHullSeries({ points })).toThrowError('tooFewPoints');
  });

  test('has no period', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
    ];

    expect(() => new TimeHullSeries({ points })).toThrowError('noPeriod');
  });

  test('has 3 points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
    ];

    const series = new TimeHullSeries({ points, period: 5000 });
    expect(series.points.length).toBe(3);
  });

  test('sorts the points by timestamp', () => {
    const points = [
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
    ];

    const hullSeries = new TimeHullSeries({ points, period: 5000 });
    expect(hullSeries.points).toEqual([
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
    ]);
  });
});
