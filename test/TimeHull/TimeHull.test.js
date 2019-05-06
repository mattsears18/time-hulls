const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.constructor()', () => {
  it('creates a TimeHull without passing options', () => {
    expect(() => new TimeHull()).to.throw('noSeriesPoints');
  });

  it('has undefined seriesPoints', () => {
    expect(() => new TimeHull({})).to.throw('noSeriesPoints');
  });

  it('has empty seriesPoints', () => {
    expect(() => new TimeHull({ seriesPoints: [] })).to.throw('noSeriesPoints');
  });

  it('has a default startIndex of zero', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.startIndex).to.equal(0);
  });

  it('has a default endIndex of 3', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.endIndex).to.equal(3);
  });

  it('calculates a duration', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8000 },
      { x: 100, y: 100, timestamp: 10000 },
      { x: 100, y: 100, timestamp: 10000 },
      { x: 100, y: 100, timestamp: 10000 },
    ];

    expect(new TimeHull({
      seriesPoints: points,
      startIndex: 0,
      endIndex: 1,
    }).duration()).to.equal(1000);

    expect(new TimeHull({
      seriesPoints: points,
      startIndex: 0,
      endIndex: 3,
    }).duration()).to.equal(4000);

    expect(new TimeHull({
      seriesPoints: points,
      startIndex: 0,
      endIndex: 6,
    }).duration()).to.equal(0);
  });
});


describe('TimeHull - simple methods', () => {
  it('has a startTime', () => {
    const points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.startTime()).to.equal(1337);
  });

  it('has an endTime', () => {
    const points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.endTime()).to.equal(3000);
  });

  it('has a period', () => {
    const points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.period()).to.equal(3663);
  });

  it('has a lastPoint', () => {
    const points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.lastPoint()).to.eql({ x: 100, y: 100, timestamp: 5000 });
  });
});
