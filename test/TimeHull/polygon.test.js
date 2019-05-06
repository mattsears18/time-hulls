const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.polygon()', () => {
  it('gets a polygon without passing options', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.polygon()).to.eql([
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
    ]);
  });

  it('gets a polygon with no inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.polygon({})).to.eql([
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
    ]);
  });

  it('gets a polygon with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 3000 },
      { x: 110, y: 190, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.polygon({})).to.eql([
      { x: 200, y: 200 },
      { x: 100, y: 200 },
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
    ]);
  });

  it('gets the x coordinates of a polygon with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 3000 },
      { x: 110, y: 190, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.polygon({ which: 'x' })).to.eql([200, 100, 100, 200, 200]);
  });

  it('gets the y coordinates of a polygon with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 3000 },
      { x: 110, y: 190, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.polygon({ which: 'y' })).to.eql([200, 200, 100, 100, 200]);
  });

  it('only has one point', () => {
    const points = [{ x: 100, y: 100, timestamp: 0 }];
    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.polygon({})).to.eql([
      { x: 100, y: 100 },
      { x: 100, y: 100 },
    ]);
  });

  it('only has two points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.polygon({})).to.eql([
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 100, y: 100 },
    ]);
  });

  it('only has three points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 100, y: 200, timestamp: 2000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.polygon({})).to.eql([
      { x: 100, y: 100 },
      { x: 100, y: 200 },
      { x: 200, y: 100 },
      { x: 100, y: 100 },
    ]);
  });
});
