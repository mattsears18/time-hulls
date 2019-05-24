const TimeHull = require('../../lib/TimeHull');

describe('TimeHull.timestep()', () => {
  test('has too few points to calculate a timestep', () => {
    const points = [{ x: 100, y: 100, timestamp: 0 }];
    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.timestep()).toBe(0);
  });

  test('gets a timestep', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 3500 },
    ];

    const timeHull = new TimeHull({ seriesPoints: points });
    expect(timeHull.timestep()).toBe(500);
  });
});
