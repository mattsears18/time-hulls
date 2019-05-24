const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.constructor()', () => {
  test('creates a TimeHull without passing options', () => {
    expect(() => new TimeHull()).toThrowError('noSeriesPoints');
  });

  test('has undefined seriesPoints', () => {
    expect(() => new TimeHull({})).toThrowError('noSeriesPoints');
  });

  test('has empty seriesPoints', () => {
    expect(() => new TimeHull({ seriesPoints: [] })).toThrowError('noSeriesPoints');
  });

  test('has a default startIndex of zero', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.startIndex).toBe(0);
  });

  test('has a default endIndex of 3', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.endIndex).toBe(3);
  });

  test('calculates a duration', () => {
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

    expect(
      new TimeHull({
        seriesPoints: points,
        startIndex: 0,
        endIndex: 1,
      }).duration(),
    ).toBe(1000);

    expect(
      new TimeHull({
        seriesPoints: points,
        startIndex: 0,
        endIndex: 3,
      }).duration(),
    ).toBe(4000);

    expect(
      new TimeHull({
        seriesPoints: points,
        startIndex: 0,
        endIndex: 6,
      }).duration(),
    ).toBe(0);
  });
});

describe('TimeHull - simple methods', () => {
  test('has a startTime', () => {
    const points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.startTime()).toBe(1337);
  });

  test('has an endTime', () => {
    const points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.endTime()).toBe(3000);
  });

  test('has a period', () => {
    const points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.period()).toBe(3663);
  });

  test('has a lastPoint', () => {
    const points = [
      { x: 100, y: 100, timestamp: 1337 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.lastPoint()).toEqual({ x: 100, y: 100, timestamp: 5000 });
  });
});
