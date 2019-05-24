const { expect } = require('chai');
const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.coverage()', () => {
  it('has too few points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 200, timestamp: 1000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.coverage({})).to.equal(0);
  });

  it('has zero coverage', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.coverage({})).to.equal(0);
  });

  it('gets coverage with no inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({
      seriesPoints: points,
      width: 2000,
      height: 1000
    });
    expect(timeHull.coverage({})).to.equal(0.005);
  });

  it('gets coverage without passing options', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({
      seriesPoints: points,
      width: 2000,
      height: 1000
    });
    expect(timeHull.coverage()).to.equal(0.005);
  });

  it('gets coverage with inner points', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 110, timestamp: 4000 },
      { x: 200, y: 190, timestamp: 5000 },
      { x: 110, y: 170, timestamp: 6000 },
      { x: 140, y: 155, timestamp: 7000 }
    ];

    const timeHull = new TimeHull({
      seriesPoints: points,
      width: 2000,
      height: 1000
    });
    expect(timeHull.coverage({})).to.equal(0.005);
  });

  it('has full coverage', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 2000, y: 0, timestamp: 1000 },
      { x: 2000, y: 1000, timestamp: 2000 },
      { x: 0, y: 1000, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({
      seriesPoints: points,
      width: 2000,
      height: 1000
    });
    expect(timeHull.coverage({})).to.equal(1);
  });

  it('gets the coverage of a custom set of points', () => {
    const dummyPoints = [{ x: 1, y: 1, timestamp: 1000 }];
    const timeHull = new TimeHull({
      seriesPoints: dummyPoints,
      width: 1000,
      height: 1000
    });

    const points = [
      { x: 0, y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 100 },
      { x: 0, y: 100 }
    ];

    expect(timeHull.coverage({ points })).to.equal(0.03);
  });

  it('overrides width and height', () => {
    const dummyPoints = [{ x: 1, y: 1, timestamp: 1000 }];
    const timeHull = new TimeHull({
      seriesPoints: dummyPoints,
      width: 10,
      height: 10
    });

    const points = [
      { x: 0, y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 100 },
      { x: 0, y: 100 }
    ];

    expect(timeHull.coverage({ points, width: 1000, height: 1000 })).to.equal(
      0.03
    );
  });

  it('has does not provide stimulus dimensions', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 300, y: 0, timestamp: 1000 },
      { x: 300, y: 100, timestamp: 2000 },
      { x: 0, y: 100, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(() => {
      timeHull.coverage({});
    }).to.throw('noStimulusArea');

    const timeHull2 = new TimeHull({ seriesPoints: points, width: 1000 });
    expect(() => {
      timeHull2.coverage({});
    }).to.throw('noStimulusArea');

    const timeHull3 = new TimeHull({ seriesPoints: points, height: 1000 });
    expect(() => {
      timeHull3.coverage({});
    }).to.throw('noStimulusArea');
  });

  it('has zero stimulus area', () => {
    const points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 300, y: 0, timestamp: 1000 },
      { x: 300, y: 100, timestamp: 2000 },
      { x: 0, y: 100, timestamp: 3000 }
    ];

    const timeHull = new TimeHull({
      seriesPoints: points,
      width: 0,
      height: 0
    });
    expect(() => {
      timeHull.coverage({});
    }).to.throw('noStimulusArea');
  });
});
