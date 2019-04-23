const TimeHull = require('../../lib/TimeHull');
var expect     = require('chai').expect;

describe('TimeHull.getSlicedPoints()', () => {
  it('gets all of the points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints()).to.eql([
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ]);

    expect(timeHull.getSlicedPoints()).to.eql(timeHull.seriesPoints);
  });

  it('gets the x coordinates only', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('x')).to.eql([ 100, 200, 200, 100, ]);
  });

  it('gets the y coordinates only', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('y')).to.eql([ 100, 100, 200, 200, ]);
  });

  it('requests an undefined coordinate', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.getSlicedPoints('z')).to.eql([ undefined, undefined, undefined, undefined, ]);
  });

  it('slices off the beginning points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points, startIndex: 4 });
    expect(timeHull.getSlicedPoints()).to.eql([
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 },
    ]);
  });

  it('slices off the end points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points, endIndex: 4 });
    expect(timeHull.getSlicedPoints()).to.eql([
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
    ]);
  });

  it('slices off the beginning and end points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
      { x: 100, y: 200, timestamp: 7000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points, startIndex: 2, endIndex: 6 });
    expect(timeHull.getSlicedPoints()).to.eql([
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 200, y: 100, timestamp: 5000 },
      { x: 200, y: 200, timestamp: 6000 },
    ]);
  });
});
