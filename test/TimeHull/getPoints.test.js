const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.getPoints()', () => {
  it('gets all of the points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPoints()).to.eql([
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ]);

    expect(timeHull.getPoints()).to.eql(timeHull.seriesPoints());
  });

  it('gets the x coordinates only', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPoints('x')).to.eql([100, 200, 200, 100]);
  });

  it('gets the y coordinates only', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPoints('y')).to.eql([100, 100, 200, 200]);
  });

  it('requests an undefined coordinate', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getPoints('z')).to.eql([
      undefined,
      undefined,
      undefined,
      undefined
    ]);
  });
});
