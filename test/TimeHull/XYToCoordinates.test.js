const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.XYToCoordinates()', () => {
  it('converts the XY to coorindates', () => {
    const points = [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 }
    ];

    expect(TimeHull.XYToCoordinates(points)).to.eql([
      [100, 100],
      [200, 100],
      [200, 200],
      [100, 200]
    ]);
  });
});
