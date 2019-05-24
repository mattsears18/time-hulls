const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.area()', () => {
  test('gets an area without passing options', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.area()).toBe(10000);
  });

  test('gets an area with no inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.area()).toBe(10000);
  });

  test('gets an area with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 4000 },
      { x: 110, y: 190, timestamp: 5000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.area()).toBe(10000);
  });

  test('only has one point', () => {
    const points = [{ x: 1337, y: 137, timestamp: 0 }];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.area()).toBe(0);
  });

  test('only has two points', () => {
    const points = [{ x: 100, y: 100, timestamp: 0 }, { x: 200, y: 100, timestamp: 1000 }];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.area()).toBe(0);
  });

  test('has three points but less than three unique', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.area()).toBe(0);
  });

  test('has three unique points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 100, y: 200, timestamp: 2000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.area()).toBe(5000);
  });

  test('has three unique but colinear points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 200, timestamp: 1000 },
      { x: 300, y: 300, timestamp: 2000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.area()).toBe(0);
  });

  test('gets the area of a custom set of points', () => {
    const dummyPoints = [{ x: 1, y: 1, timestamp: 1000 }];
    const timeHull = new TimeHull({ seriesPoints: dummyPoints });

    const points = [{ x: 0, y: 0 }, { x: 300, y: 0 }, { x: 300, y: 100 }, { x: 0, y: 100 }];

    expect(timeHull.area({ points })).toBe(30000);
  });

  test('gets the area of a custom set of points with inner points', () => {
    const dummyPoints = [{ x: 1, y: 1, timestamp: 1000 }];
    const timeHull = new TimeHull({ seriesPoints: dummyPoints });

    const points = [
      { x: 0, y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 100 },
      { x: 0, y: 100 },
      { x: 150, y: 80 },
      { x: 10, y: 10 },
      { x: 200, y: 20 },
    ];

    expect(timeHull.area({ points })).toBe(30000);
  });
});
