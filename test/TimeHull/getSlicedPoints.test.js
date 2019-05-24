const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.getSlicedPoints()', () => {
  test('gets all of the points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints()).toEqual([
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ]);

    expect(timeHull.getSlicedPoints()).toEqual(timeHull.seriesPoints());
  });

  test('gets the x coordinates only', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('x')).toEqual([100, 200, 200, 100]);
  });

  test('gets the y coordinates only', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('y')).toEqual([100, 100, 200, 200]);
  });

  test('requests an undefined coordinate', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('z')).toEqual([
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
  });

  test('slices off the beginning points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points, startIndex: 4 });
    expect(timeHull.getSlicedPoints()).toEqual([
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 },
    ]);
  });

  test('slices off the end points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points, endIndex: 4 });
    expect(timeHull.getSlicedPoints()).toEqual([
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
    ]);
  });

  test('slices off the beginning and end points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 },
    ];

    const timeHull = new TimeHull({
      seriesPoints: points,
      startIndex: 2,
      endIndex: 6,
    });
    expect(timeHull.getSlicedPoints()).toEqual([
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
    ]);
  });
});
