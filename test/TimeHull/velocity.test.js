const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.velocity()', () => {
  it('calculates the total velocity (speed)', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity()).to.equal(5);
  });

  it('calculates the x component of velocity', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity('x')).to.equal(-3);
  });

  it('calculates the y component of velocity', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: -100, y: -200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity('y')).to.equal(-4);
  });

  it('does not move', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2900 },
      { x: 200, y: 200, timestamp: 3000 }, // distance 300 left, 400 down, 500 total (hypotenuse)
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.velocity()).to.equal(0);
    expect(timeHull.velocity('x')).to.equal(0);
    expect(timeHull.velocity('y')).to.equal(0);
  });
});
