const TimeHullSeries  = require('../../lib/TimeHullSeries');
var expect            = require('chai').expect;

describe('TimeHullSeries.getStartPointIndex()', () => {
  it('gets the start indices (instantaneous)', async () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8001 },
      { x: 100, y: 100, timestamp: 9000 },
    ];

    let hullSeries = new TimeHullSeries({
      points: points,
      period: 5000,
    });

    expect(hullSeries.getStartPointIndex(9)).to.equal(4);
    expect(hullSeries.getStartPointIndex(8)).to.equal(4);
  });

  it('returns the first point when it runs out of points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8001 },
      { x: 100, y: 100, timestamp: 9000 },
    ];

    let hullSeries = new TimeHullSeries({
      points: points,
      period: 5000,
    });

    expect(hullSeries.getStartPointIndex(2)).to.equal(0);
    expect(hullSeries.getStartPointIndex(0)).to.equal(0);
  });

  // it('gets the start indices (continuous)', async () => {
  //   let viewing = Factory.create('viewing', {
  //     period: 5000,
  //     points: [
  //       { x: 100, y: 100, timestamp: 0 },
  //       { x: 100, y: 100, timestamp: 1000 },
  //       { x: 100, y: 100, timestamp: 2000 },
  //       { x: 100, y: 100, timestamp: 3000 },
  //       { x: 100, y: 100, timestamp: 4000 },
  //       { x: 100, y: 100, timestamp: 5000 },
  //       { x: 100, y: 100, timestamp: 6000 },
  //       { x: 100, y: 100, timestamp: 7000 },
  //       { x: 100, y: 100, timestamp: 8001 },
  //       { x: 100, y: 100, timestamp: 9000 },
  //     ],
  //   });
  //
  //   let hullSeries = viewing.timeHullSeries({
  //     instantContinuous: 'continuous',
  //     slideStep: 'slide',
  //   });
  //
  //   expect(hullSeries.getStartPointIndex(9)).to.equal(0);
  //   expect(hullSeries.getStartPointIndex(8)).to.equal(0);
  //   expect(hullSeries.getStartPointIndex(7)).to.equal(0);
  //   expect(hullSeries.getStartPointIndex(6)).to.equal(0);
  //   expect(hullSeries.getStartPointIndex(1)).to.equal(0);
  // });

  it('has an endIndex that is out of bounds', () => {
    let points = [{ x: 100, y: 100, timestamp: 0 }];
    let hullSeries = new TimeHullSeries({
      points: points,
      period: 5000,
    });

    expect(() => { hullSeries.getStartPointIndex(-1) }).to.throw('endIndexOutOfBounds');
    expect(() => { hullSeries.getStartPointIndex(1) }).to.throw('endIndexOutOfBounds');
    expect(() => { hullSeries.getStartPointIndex(20) }).to.throw('endIndexOutOfBounds');
  });
});
