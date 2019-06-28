const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getEndPointIndex()', () => {
  test('cannot meet the period with a single point', () => {
    const noHullPoints = [{ x: 100, y: 100, timestamp: 0 }];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getEndPointIndex(0)).toEqual(undefined);
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

    expect(noHullSeries.getEndPointIndex(0)).toEqual(undefined);
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

    expect(noHullSeries.getEndPointIndex(0)).toEqual(0);
  });

  test('gets the end indices', () => {
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

    expect(hullSeries.getEndPointIndex(0)).toBe(5);
    expect(hullSeries.getEndPointIndex(3)).toBe(7);
  });

  test('is undefined if the period is not met', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 }
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullSeries.getEndPointIndex(0)).toBeUndefined();
    expect(hullSeries.getEndPointIndex(2)).toBeUndefined();
  });

  test('gets a hull with a duration exactly equal to the period without a following point', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 }
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 4000
    });

    expect(hullSeries.getEndPointIndex(0)).toBe(4);
    expect(hullSeries.getEndPointIndex(2)).toBeUndefined();
  });

  test('has a startIndex that is out of bounds', () => {
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
      hullSeries.getEndPointIndex(-1);
    }).toThrowError('startIndexOutOfBounds');
    expect(() => {
      hullSeries.getEndPointIndex(3);
    }).toThrowError('startIndexOutOfBounds');
    expect(() => {
      hullSeries.getEndPointIndex(20);
    }).toThrowError('startIndexOutOfBounds');
  });

  test('has a hull duration that is less than the period', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3500 },
      { x: 100, y: 100, timestamp: 4500 },
      { x: 100, y: 100, timestamp: 5500 },
      { x: 100, y: 100, timestamp: 6500 },
      { x: 100, y: 100, timestamp: 7500 }
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullSeries.getEndPointIndex(0)).toBe(4);
    expect(hullSeries.getEndPointIndex(2)).toBe(6);
    expect(hullSeries.getEndPointIndex(3)).toBeUndefined();
  });
});
