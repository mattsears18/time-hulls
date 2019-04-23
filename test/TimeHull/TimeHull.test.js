const TimeHull = require('../../lib/TimeHull');
var expect     = require('chai').expect;

describe('TimeHull.constructor()', () => {
  it('has undefined seriesPoints', () => {
    expect(() => { new TimeHull({}) }).to.throw('noSeriesPoints');
  });

  it('has empty seriesPoints', () => {
    expect(() => { new TimeHull({ seriesPoints: [] }) }).to.throw('noSeriesPoints');
  });

  it('has a default startIndex of zero', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.startIndex).to.equal(0);
  });

  it('has a default endIndex of 3', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.endIndex).to.equal(3);
  });

  it('calculates a duration', () => {
    let points = [
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

    expect(new TimeHull({ seriesPoints: points, startIndex: 0, endIndex: 1 }).duration()).to.equal(1000);
    expect(new TimeHull({ seriesPoints: points, startIndex: 0, endIndex: 3 }).duration()).to.equal(4000);
    expect(new TimeHull({ seriesPoints: points, startIndex: 0, endIndex: 6 }).duration()).to.equal(0);
  });
});








describe('TimeHull - simple methods', () => {
  it('has a startTime', () => {
    let points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.startTime()).to.equal(1337);
  });

  it('has an endTime', () => {
    let points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.endTime()).to.equal(3000);
  });

  it('has a period', () => {
    let points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.period()).to.equal(3663);
  });

  it('has a lastPoint', () => {
    let points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.lastPoint()).to.eql({ x: 100, y: 100, timestamp: 5000 });
  });

  // it('gets the point times', () => {
  //   let points = [
  //       { x: 100, y: 100, timestamp: 1337 },
  //       { x: 100, y: 100, timestamp: 2000 },
  //       { x: 100, y: 100, timestamp: 3000 },
  //       { x: 100, y: 100, timestamp: 4000 },
  //       { x: 100, y: 100, timestamp: 5000 },
  //     ],
  //   });
  //
  //   let timeHull = new TimeHull({ seriesPoints: points });
  //   expect(timeHull.pointTimes()).to.eql([
  //     1337,
  //     2000,
  //     3000,
  //     4000,
  //     5000,
  //   ]);
  // });
  //
  // it('formats the point times', () => {
  //   let viewing = Factory.create('viewing', {
  //     points: [
  //       { x: 100, y: 100, timestamp: 1337 },
  //       { x: 100, y: 100, timestamp: 2000 },
  //       { x: 100, y: 100, timestamp: 3000 },
  //       { x: 100, y: 100, timestamp: 4000 },
  //       { x: 100, y: 100, timestamp: 5000 },
  //     ],
  //   });
  //
  //   let timeHull = new TimeHull({ seriesPoints: points });
  //   expect(timeHull.pointTimesText()).to.eql([
  //     'Time: 1,337ms',
  //     'Time: 2,000ms',
  //     'Time: 3,000ms',
  //     'Time: 4,000ms',
  //     'Time: 5,000ms',
  //   ]);
  // });
});
