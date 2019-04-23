const TimeHull = require('../../lib/TimeHull');
var expect     = require('chai').expect;

describe('TimeHull.velocity()', () => {
  it('calculates the total velocity (speed)', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity()).to.equal(5);
  });

  it('calculates the x component of velocity', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity('x')).to.equal(-3);
  });

  it('calculates the y component of velocity', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity('y')).to.equal(-4);
  });

  it('does not move', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: 200, y: 200, timestamp: 3000 }, //distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity()).to.equal(0);
    expect(timeHull.velocity('x')).to.equal(0);
    expect(timeHull.velocity('y')).to.equal(0);
  });
});
