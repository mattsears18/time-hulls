const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getHull()', () => {
  const testPoints = [
    { x: 100, y: 100, timestamp: 0 },
    { x: 100, y: 100, timestamp: 1000 },
    { x: 100, y: 100, timestamp: 2000 },
    { x: 100, y: 100, timestamp: 3000 },
    { x: 100, y: 100, timestamp: 4000 },
    { x: 100, y: 100, timestamp: 5000 },
    { x: 100, y: 100, timestamp: 6000 },
    { x: 100, y: 100, timestamp: 7000 },
    { x: 100, y: 100, timestamp: 8000 },
    { x: 100, y: 100, timestamp: 9000 },
    { x: 100, y: 100, timestamp: 10000 },
    { x: 100, y: 100, timestamp: 11000 }
  ];

  test('requests an out of bounds hullIndex because it has no hulls', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(() => {
      noHullSeries.getHull({ hullIndex: 0 });
    }).toThrowError('hullIndexOutOfBounds');
    expect(() => {
      noHullSeries.getHull({ hullIndex: 2 });
    }).toThrowError('hullIndexOutOfBounds');
  });

  test('does not specify a hull', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000
    });

    expect(() => {
      hullseries.getHull();
    }).toThrowError('noHullSpecified');
    expect(() => {
      hullseries.getHull({ hull: undefined });
    }).toThrowError('noHullSpecified');
  });

  test('gets a hull by passing a hull (confirms that the hull is a TimeHull)', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000
    });

    const testHull = hullseries.getHulls()[3];
    const hull = hullseries.getHull({ hull: testHull });

    expect(hull.constructor.name).toBe('TimeHull');
    expect(hull.number).toBe(4);
  });

  test('passes an invalid hull', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000
    });

    expect(() => {
      hullseries.getHull({ hull: {} });
    }).toThrowError('invalidHull');
  });

  test('passes an invalid hullIndex', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000
    });

    expect(() => {
      hullseries.getHull({ hullIndex: '' });
    }).toThrowError('invalidHullIndex');
  });

  test('gets a hull by hullIndex', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000
    });

    const hull = hullseries.getHull({ hullIndex: 3 });
    expect(hull.constructor.name).toBe('TimeHull');
    expect(hull.number).toBe(4);
  });

  test('requests an out of bounds hullIndex', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000
    });

    expect(() => {
      hullseries.getHull({ hullIndex: -3 });
    }).toThrowError('hullIndexOutOfBounds');
    expect(() => {
      hullseries.getHull({ hullIndex: 10000000 });
    }).toThrowError('hullIndexOutOfBounds');
  });
});
