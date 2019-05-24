const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.distance()', () => {
  test('calculates the total distance', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.distance()).toBe(500);
  });

  test('calculates the x distance', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.distance('x')).toBe(-300);
  });

  test('calculates the y distance', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.distance('y')).toBe(-400);
  });

  test('has too few points to have a distance', () => {
    const points = [{ x: 100, y: 100, timestamp: 0 }];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.distance('y')).toBe(0);
  });
});
