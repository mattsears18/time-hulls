const TimeHull = require('../../lib/TimeHull');
var expect     = require('chai').expect;

describe('TimeHull.coordinatesToXY()', () => {
  it('converts the coordinates to XY', () => {
    let dummyPoints = [{ x: 100, y: 100, timestamp: 0 }];
    let timeHull = new TimeHull({ seriesPoints: dummyPoints });

    let points = [
      [ 100, 100 ],
      [ 200, 100 ],
      [ 200, 200 ],
      [ 100, 200 ],
    ];

    expect(timeHull.coordinatesToXY(points)).to.eql([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
    ]);
  });
});
