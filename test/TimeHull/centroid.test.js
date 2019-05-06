const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.centroid()', () => {
  it('gets a centroid without passing options', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.centroid()).to.eql({ x: 150, y: 150 });
  });

  it('gets a centroid with no inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.centroid()).to.eql({ x: 150, y: 150 });
  });

  it('gets a centroid with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 3000 },
      { x: 110, y: 190, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.centroid()).to.eql({ x: 150, y: 150 });
  });

  it('only has one point', () => {
    const points = [
      { x: 1337, y: 137, timestamp: 0 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.centroid()).to.eql({ x: 1337, y: 137 });
  });

  it('only has one unique point', () => {
    const points = [
      { x: 1337, y: 137, timestamp: 0 },
      { x: 1337, y: 137, timestamp: 0 },
      { x: 1337, y: 137, timestamp: 0 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.centroid()).to.eql({ x: 1337, y: 137 });
  });

  it('only has two points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.centroid()).to.eql({ x: 150, y: 100 });
  });

  it('only has three points', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 50, y: 300, timestamp: 2000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.centroid()).to.eql({ x: 50, y: 100 });
  });

  it('gets a single coordinate of the centroid', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 50, y: 300, timestamp: 2000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.centroid({ which: 'x' })).to.eql(50);
    expect(timeHull.centroid({ which: 'y' })).to.eql(100);
  });
});
