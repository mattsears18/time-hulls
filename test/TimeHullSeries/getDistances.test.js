const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getDistances()', () => {
  const points = [
    { x: 100, y: 400, timestamp: 0 },
    { x: 200, y: 300, timestamp: 1000 },
    { x: 300, y: 200, timestamp: 2000 },
    { x: 400, y: 100, timestamp: 3000 },
    { x: 500, y: 700, timestamp: 4000 }
  ];

  test('gets the point distances', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullseries.getDistances()).toEqual([
      141.421356237309505,
      141.421356237309505,
      141.421356237309505,
      608.276253029821969
    ]);
  });

  test('gets the X point distances', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullseries.getDistances({ which: 'x' })).toEqual([100, 100, 100, 100]);
  });

  test('gets the Y point distances', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullseries.getDistances({ which: 'y' })).toEqual([100, 100, 100, 600]);
  });

  test('gets previously cached distances', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    hullseries.distances = 1337;

    expect(hullseries.getDistances()).toEqual(1337);
  });
});
