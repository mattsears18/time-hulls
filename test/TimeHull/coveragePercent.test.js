const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.coveragePercent()', () => {
  it('gets coveragePercent with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 110, timestamp: 4000 },
      { x: 200, y: 190, timestamp: 5000 },
      { x: 110, y: 170, timestamp: 6000 },
      { x: 140, y: 155, timestamp: 7000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points, width: 2000, height: 1000 });
    expect(timeHull.coveragePercent({})).to.equal(0.5);
  });

  it('gets coveragePercent without passing options', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 110, timestamp: 4000 },
      { x: 200, y: 190, timestamp: 5000 },
      { x: 110, y: 170, timestamp: 6000 },
      { x: 140, y: 155, timestamp: 7000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points, width: 2000, height: 1000 });
    expect(timeHull.coveragePercent()).to.equal(0.5);
  });
});
