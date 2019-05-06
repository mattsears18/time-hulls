const { expect } = require('chai');
const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getHull()', () => {
  const testPoints = [
    { x: 100, y: 100, timestamp: 0 },
    { x: 100, y: 100, timestamp: 1000 },
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
  ];

  it('does not specify a hull', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    });

    expect(() => { hullseries.getHull(); }).to.throw('noHullSpecified');
    expect(() => { hullseries.getHull({ hull: undefined }); }).to.throw('noHullSpecified');
  });

  it('gets a hull by passing a hull (confirms that the hull is a TimeHull)', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    });

    const testHull = hullseries.getHulls()[3];
    const hull = hullseries.getHull({ hull: testHull });

    expect(hull.constructor.name).to.equal('TimeHull');
    expect(hull.number).to.equal(4);
  });

  it('passes an invalid hull', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    });

    expect(() => { hullseries.getHull({ hull: {} }); }).to.throw('invalidHull');
  });

  it('passes an invalid hullIndex', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    });

    expect(() => { hullseries.getHull({ hullIndex: '' }); }).to.throw('invalidHullIndex');
  });

  it('gets a hull by hullIndex', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    });

    const hull = hullseries.getHull({ hullIndex: 3 });
    expect(hull.constructor.name).to.equal('TimeHull');
    expect(hull.number).to.equal(4);
  });

  it('requests an out of bounds hullIndex', () => {
    const hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    });

    expect(() => { hullseries.getHull({ hullIndex: -3 }); }).to.throw('hullIndexOutOfBounds');
    expect(() => { hullseries.getHull({ hullIndex: 10000000 }); }).to.throw('hullIndexOutOfBounds');
  });
});
