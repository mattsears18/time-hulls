const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.XYToCoordinates()', () => {
  test('converts the XY to coorindates', () => {
    const points = [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
    ];

    expect(TimeHull.XYToCoordinates(points)).toEqual([
      [100, 100],
      [200, 100],
      [200, 200],
      [100, 200],
    ]);
  });
});
