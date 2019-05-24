const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.azimuth()', () => {
  test('has too few points to calculate an azimuth', () => {
    const points = [{ x: 100, y: 100, timestamp: 0 }];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.azimuth()).toBeUndefined();
  });

  test('did not move', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 0, y: 0 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(0);
  });

  test('calculates a 0 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 0, y: 100 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(0);
  });

  test('calculates a 30 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 100, y: 100 * Math.sqrt(3) },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(30);
  });

  test('calculates a 45 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 100, y: 100 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(45);
  });

  test('calculates a 90 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 100, y: 0 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(90);
  });

  test('calculates a 135 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 100, y: -100 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(135);
  });

  test('calculates a 150 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 100, y: -100 * Math.sqrt(3) },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(150);
  });

  test('calculates a 180 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: 0, y: -100 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(180);
  });

  test('calculates a 225 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: -100, y: -100 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(225);
  });

  test('calculates a 270 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: -100, y: 0 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(270);
  });

  test('calculates a 315 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: -100, y: 100 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(315);
  });

  test('calculates a 330 degree azimuth', () => {
    const points = [
      { timestamp: 1000, x: 0, y: 0 },
      { timestamp: 2000, x: -100, y: 100 * Math.sqrt(3) }, // 30 degrees
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(Math.round(timeHull.azimuth())).toBe(330);
  });
});
