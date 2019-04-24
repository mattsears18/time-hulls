const TimeHullSeries  = require('../../lib/TimeHullSeries');
var expect            = require('chai').expect;

describe('TimeHullSeries.constructor()', () => {
  it('has undefined points', () => {
    expect(() => { new TimeHullSeries({}) }).to.throw('noPoints');
  });

  it('has empty points', () => {
    expect(() => { new TimeHullSeries({ points: [] }) }).to.throw('noPoints');
  });

  it('has too few points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0},
      { x: 100, y: 100, timestamp: 1000}
    ];

    expect(() => { new TimeHullSeries({ points: points }) }).to.throw('tooFewPoints');
  });

  it('has 3 points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0},
      { x: 100, y: 100, timestamp: 1000},
      { x: 100, y: 100, timestamp: 2000},
    ];

    let series = new TimeHullSeries({ points: points });
    expect(series.points.length).to.equal(3);
  });

  it('sorts the points by timestamp', () => {
    let points = [
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
    ];

    let hullSeries = new TimeHullSeries({ points: points });
    expect(hullSeries.points).to.eql([
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
    ]);
  })
});
