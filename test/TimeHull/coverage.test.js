const TimeHull = require('../../lib/TimeHull');
var expect     = require('chai').expect;

describe('TimeHull.coverage()', () => {
  it('has too few points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 200, timestamp: 1000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.coverage({})).to.equal(0);
  });

  it('has zero coverage', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.coverage({})).to.equal(0);
  });

  it('gets coverage with no inner points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points, width: 2000, height: 1000 });
    expect(timeHull.coverage({})).to.equal(0.005);
  });

  it('gets coverage without passing options', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points, width: 2000, height: 1000 });
    expect(timeHull.coverage()).to.equal(0.005);
  });

  it('gets coverage with inner points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 110, timestamp: 4000 },
      { x: 200, y: 190, timestamp: 5000 },
      { x: 110, y: 170, timestamp: 6000 },
      { x: 140, y: 155, timestamp: 7000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points, width: 2000, height: 1000 });
    expect(timeHull.coverage({})).to.equal(0.005);
  });

  it('has full coverage', () => {
    let points = [
      { x: 0,     y: 0,     timestamp: 0 },
      { x: 2000,  y: 0,     timestamp: 1000 },
      { x: 2000,  y: 1000,  timestamp: 2000 },
      { x: 0,     y: 1000,  timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points, width: 2000, height: 1000 });
    expect(timeHull.coverage({})).to.equal(1);
  });

  it('gets the coverage of a custom set of points', () => {
    let dummyPoints = [{ x: 1, y: 1, timestamp: 1000 }];
    let timeHull = new TimeHull({ seriesPoints: dummyPoints, width: 1000, height: 1000 });

    let points = [
      { x: 0,   y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 100 },
      { x: 0,   y: 100 },
    ];

    expect(timeHull.coverage({ points: points })).to.equal(0.03);
  });

  it('overrides width and height', () => {
    let dummyPoints = [{ x: 1, y: 1, timestamp: 1000 }];
    let timeHull = new TimeHull({ seriesPoints: dummyPoints, width: 10, height: 10 });

    let points = [
      { x: 0,   y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 100 },
      { x: 0,   y: 100 },
    ];

    expect(timeHull.coverage({ points: points, width: 1000, height: 1000 })).to.equal(0.03);
  });

  it('has does not provide stimulus dimensions', () => {
    let points = [
      { x: 0,   y: 0,   timestamp: 0 },
      { x: 300, y: 0,   timestamp: 1000 },
      { x: 300, y: 100, timestamp: 2000 },
      { x: 0,   y: 100, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points });
    expect(() => { timeHull.coverage({}) }).to.throw('noStimulusArea');

    let timeHull2 = new TimeHull({ seriesPoints: points, width: 1000 });
    expect(() => { timeHull2.coverage({}) }).to.throw('noStimulusArea');

    let timeHull3 = new TimeHull({ seriesPoints: points, height: 1000 });
    expect(() => { timeHull3.coverage({}) }).to.throw('noStimulusArea');
  });

  it('has zero stimulus area', () => {
    let points = [
      { x: 0,   y: 0,   timestamp: 0 },
      { x: 300, y: 0,   timestamp: 1000 },
      { x: 300, y: 100, timestamp: 2000 },
      { x: 0,   y: 100, timestamp: 3000 },
    ];

    let timeHull = new TimeHull({ seriesPoints: points, width: 0, height: 0 });
    expect(() => { timeHull.coverage({}) }).to.throw('noStimulusArea');
  });
});
