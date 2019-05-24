const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.elapsedTime()', () => {
  it('gets the elapsed time', () => {
    const points = [
      { x: 100, y: 100, timestamp: 22 },
      { x: 100, y: 100, timestamp: 100 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8000 },
      { x: 100, y: 100, timestamp: 9000 },
      { x: 100, y: 100, timestamp: 10000 },
      { x: 100, y: 100, timestamp: 11000 },
      { x: 100, y: 100, timestamp: 12000 },
      { x: 100, y: 100, timestamp: 13000 },
      { x: 100, y: 100, timestamp: 14000 }
    ];

    const timeHull = new TimeHull({
      seriesPoints: points,
      startIndex: 5,
      endIndex: 12
    });

    expect(timeHull.elapsedTime()).to.equal(11978);
  });
});
