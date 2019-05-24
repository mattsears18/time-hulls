const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.velocity()', () => {
  test('calculates the total velocity (speed)', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity()).toBe(5);
  });

  test('calculates the x component of velocity', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity('x')).toBe(-3);
  });

  test('calculates the y component of velocity', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity('y')).toBe(-4);
  });

  test('does not move', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: 200, y: 200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity()).toBe(0);
    expect(timeHull.velocity('x')).toBe(0);
    expect(timeHull.velocity('y')).toBe(0);
  });
});
