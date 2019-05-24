const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.distancePoints()', () => {
  it('gets distinct points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 200, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 200, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8000 },
      { x: 300, y: 100, timestamp: 9000 },
      { x: 100, y: 100, timestamp: 10000 },
      { x: 100, y: 100, timestamp: 11000 }
    ];

    expect(TimeHull.distinctPoints(points)).to.eql([
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 6000 },
      { x: 300, y: 100, timestamp: 9000 }
    ]);
  });
});
