const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.getPolygon()', () => {
  test('gets a polygon without passing options', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPolygon()).toEqual([
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
    ]);
  });

  test('gets a polygon with no inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPolygon({})).toEqual([
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
    ]);
  });

  test('gets a polygon with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 3000 },
      { x: 110, y: 190, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPolygon({})).toEqual([
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
    ]);
  });

  test('gets the x coordinates of a polygon with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 3000 },
      { x: 110, y: 190, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPolygon({ which: 'x' })).toEqual([200, 100, 100, 200, 200]);
  });

  test('gets the y coordinates of a polygon with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 3000 },
      { x: 110, y: 190, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPolygon({ which: 'y' })).toEqual([200, 200, 100, 100, 200]);
  });

  test('only has one point', () => {
    const points = [{ x: 100, y: 100, timestamp: 0 }];
    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPolygon({})).toEqual([
      { x: 100, y: 100 },
      { x: 100, y: 100 },
    ]);
  });

  test('only has two points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPolygon({})).toEqual([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 100, y: 100 },
    ]);
  });

  test('only has three points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 100, y: 200, timestamp: 2000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPolygon({})).toEqual([
      { x: 100, y: 100 },
      { x: 100, y: 200 },
      { x: 200, y: 100 },
      { x: 100, y: 100 },
    ]);
  });
});
