const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.calculateCentroid()', () => {
  test('calculates a centroid with a duplicate point at the end', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 0, y: 100, timestamp: 3000 },
      { x: 0, y: 0, timestamp: 4000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({ x: 50, y: 50 });
  });

  test('calculates a real centroid', () => {
    const points = [
      { x: 29, y: 54 },
      { x: 25, y: 84 },
      { x: 19, y: 6 },
      { x: 83, y: 96 },
      { x: 99, y: 16 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({
      x: 57.02760624772975,
      y: 48.49715461920329,
    });
  });

  test('calculates a centroid with no inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({ x: 150, y: 150 });
  });

  test('calculates a centroid with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 4000 },
      { x: 110, y: 190, timestamp: 5000 },
      { x: 150, y: 120, timestamp: 6000 },
      { x: 110, y: 190, timestamp: 7000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({ x: 150, y: 150 });
  });

  test('only has one point', () => {
    const points = [{ x: 1337, y: 137, timestamp: 0 }];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({ x: 1337, y: 137 });
  });

  test('only has one unique point', () => {
    const points = [
      { x: 1337, y: 137, timestamp: 0 },
      { x: 1337, y: 137, timestamp: 0 },
      { x: 1337, y: 137, timestamp: 0 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({ x: 1337, y: 137 });
  });

  test('only has two points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, 
      { x: 200, y: 100, timestamp: 1000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({ x: 150, y: 100 });
  });

  test('only has two unique points', () => {
    const points = [
      { x: 1337, y: 137, timestamp: 0 },
      { x: 1337, y: 137, timestamp: 1000 },
      { x: 1337, y: 137, timestamp: 2000 },
      { x: 1337, y: 137, timestamp: 3000 },
      { x: 17, y: 137, timestamp: 4000 },
      { x: 17, y: 137, timestamp: 5000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({ x: 677, y: 137 });
  });

  test('only has three points', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 50, y: 300, timestamp: 2000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.calculateCentroid(points)).toEqual({ x: 50, y: 100 });
  });
});
