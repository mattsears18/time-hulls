const TimeHull = require('../../lib/TimeHull');
var expect     = require('chai').expect;

describe('TimeHull.timestep()', () => {
  it('has too few points to calculate a timestep', () => {
    let points = [{ x: 100, y: 100, timestamp: 0 }];
    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.timestep()).to.equal(0);
  });

  it('gets a timestep', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 3500 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.timestep()).to.equal(500);
  });
});
