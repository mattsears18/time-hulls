const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getStartPointIndex()', () => {
  test('cannot meet the period with a single point', () => {
    const noHullPoints = [{ x: 100, y: 100, timestamp: 0 }];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getStartPointIndex(0)).toEqual(undefined);
  });

  test('cannot meet the period', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 100 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 1000,
      includeIncomplete: false
    });

    expect(noHullSeries.getStartPointIndex(1)).toEqual(undefined);
  });

  test('has a startIndex = endIndex when gap exceeds period', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getStartPointIndex(1)).toEqual(1);
  });

  test('gets the start indices', async () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8001 },
      { x: 100, y: 100, timestamp: 9000 }
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullSeries.getStartPointIndex(9)).toBe(4);
    expect(hullSeries.getStartPointIndex(8)).toBe(4);
    expect(hullSeries.getStartPointIndex(5)).toBe(0);
  });

  test('returns undefined when it runs out of points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8001 },
      { x: 100, y: 100, timestamp: 9000 }
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullSeries.getStartPointIndex(2)).toBeUndefined();
    expect(hullSeries.getStartPointIndex(0)).toBeUndefined();
  });

  test('has an endIndex that is out of bounds', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 }
    ];
    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(() => {
      hullSeries.getStartPointIndex(-1);
    }).toThrowError('endIndexOutOfBounds');
    expect(() => {
      hullSeries.getStartPointIndex(3);
    }).toThrowError('endIndexOutOfBounds');
    expect(() => {
      hullSeries.getStartPointIndex(20);
    }).toThrowError('endIndexOutOfBounds');
  });
});
