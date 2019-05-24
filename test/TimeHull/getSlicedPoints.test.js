const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.getSlicedPoints()', () => {
  it('gets all of the points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints()).to.eql([
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ]);

    expect(timeHull.getSlicedPoints()).to.eql(timeHull.seriesPoints());
  });

  it('gets the x coordinates only', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('x')).to.eql([100, 200, 200, 100]);
  });

  it('gets the y coordinates only', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('y')).to.eql([100, 100, 200, 200]);
  });

  it('requests an undefined coordinate', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('z')).to.eql([
      undefined,
      undefined,
      undefined,
      undefined
    ]);
  });

  it('slices off the beginning points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points, startIndex: 4 });
    expect(timeHull.getSlicedPoints()).to.eql([
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 }
    ]);
  });

  it('slices off the end points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points, endIndex: 4 });
    expect(timeHull.getSlicedPoints()).to.eql([
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 }
    ]);
  });

  it('slices off the beginning and end points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 }
    ];

    const timeHull = new TimeHull({
      seriesPoints: points,
      startIndex: 2,
      endIndex: 6
    });
    expect(timeHull.getSlicedPoints()).to.eql([
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 }
    ]);
  });
});
