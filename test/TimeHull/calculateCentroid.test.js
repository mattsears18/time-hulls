const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.calculateCentroid()', () => {
  test('calculates a centroid', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 0, y: 100, timestamp: 3000 },
    ];

    expect(TimeHull.calculateCentroid(points)).toEqual({ x: 50, y: 50 });
  });

  test('calculates a centroid with a duplicate point at the end', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 0, y: 100, timestamp: 3000 },
      { x: 0, y: 0, timestamp: 4000 },
    ];

    expect(TimeHull.calculateCentroid(points)).toEqual({ x: 50, y: 50 });
  });

  test('calculates a real centroid', () => {
    const points = [
      { x: 29, y: 54 },
      { x: 25, y: 84 },
      { x: 19, y: 6 },
      { x: 83, y: 96 },
      { x: 99, y: 16 },
    ];

    expect(TimeHull.calculateCentroid(points)).toEqual({
      x: 104.93470790378007,
      y: 59.99312714776632,
    });
  });
});
