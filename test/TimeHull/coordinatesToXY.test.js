const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.coordinatesToXY()', () => {
  test('converts the coordinates to XY', () => {
    const points = [[100, 100], [200, 100], [200, 200], [100, 200]];

    expect(TimeHull.coordinatesToXY(points)).toEqual([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
    ]);
  });
});
