const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.getCentroid()', () => {
  test('gets a simple centroid', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getCentroid()).toEqual({ x: 150, y: 150 });
  });

  test('gets a single coordinate of a centroid', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 50, y: 300, timestamp: 2000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getCentroid({ which: 'x' })).toBe(50);
    expect(timeHull.getCentroid({ which: 'y' })).toBe(100);
  });

  test ('gets a previously cached centroid', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 50, y: 300, timestamp: 2000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    timeHull.centroid = 1337;

    expect(timeHull.getCentroid()).toBe(1337);
  });
});
