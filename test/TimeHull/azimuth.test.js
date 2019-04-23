const TimeHull = require('../../lib/TimeHull');
var expect     = require('chai').expect;

describe('TimeHull.azimuth()', () => {
  it('has too few points to calculate an azimuth', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.azimuth()).to.be.an('undefined');
  });

  it('did not move', () => {
    let points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 0, y: 0 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(0);
  });

  it('calculates a 0 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 0, y: 100 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(0);
  });

  it('calculates a 30 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: 100, y: (100 * Math.sqrt(3)) },
    ]

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(30);
  });

  it('calculates a 45 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: 100, y: 100 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(45);
  });

  it('calculates a 90 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: 100, y: 0 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(90);
  });

  it('calculates a 135 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: 100, y: -100 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(135);
  });

  it('calculates a 150 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: 100, y: (-100 * Math.sqrt(3)) },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(150);
  });

  it('calculates a 180 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 0, y: -100 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(180);
  });

  it('calculates a 225 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: -100, y: -100 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(225);
  });

  it('calculates a 270 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: -100, y: 0 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(270);
  });

  it('calculates a 315 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: -100, y: 100 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(315);
  });

  it('calculates a 330 degree azimuth', () => {
    let points = [
      { timestamp: 1000, x: 0,   y: 0 },
      { timestamp: 2000, x: -100, y: (100 * Math.sqrt(3)) }, // 30 degrees
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).to.equal(330);
  });
});
