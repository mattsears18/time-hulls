const TimeHull = require('../../lib/TimeHull');
var expect     = require('chai').expect;

describe('TimeHull.distance()', () => {
  it('calculates the total distance', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.distance()).to.equal(500);
  });

  it('calculates the x distance', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.distance('x')).to.equal(-300);
  });

  it('calculates the y distance', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.distance('y')).to.equal(-400);
  });
});
