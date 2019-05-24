const { expect } = require('chai');
const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.constructor()', () => {
  it('creates a TimeHullSeries without passing options', () => {
    expect(() => new TimeHullSeries()).to.throw('noPoints');
  });

  it('has undefined points', () => {
    expect(() => new TimeHullSeries({})).to.throw('noPoints');
  });

  it('has empty points', () => {
    expect(() => new TimeHullSeries({ points: [] })).to.throw('noPoints');
  });

  it('has too few points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 }
    ];

    expect(() => new TimeHullSeries({ points })).to.throw('tooFewPoints');
  });

  it('has no period', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 }
    ];

    expect(() => new TimeHullSeries({ points })).to.throw('noPeriod');
  });

  it('has 3 points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 }
    ];

    const series = new TimeHullSeries({ points, period: 5000 });
    expect(series.points.length).to.equal(3);
  });

  it('sorts the points by timestamp', () => {
    const points = [
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 }
    ];

    const hullSeries = new TimeHullSeries({ points, period: 5000 });
    expect(hullSeries.points).to.eql([
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 }
    ]);
  });
});
