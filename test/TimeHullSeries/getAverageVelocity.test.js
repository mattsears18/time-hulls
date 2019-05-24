const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getAverageVelocity()', () => {
  const points = [
    { x: 100, y: 400, timestamp: 0 }, //
    { x: 200, y: 300, timestamp: 1000 }, //  x:100  y:-100  total:141.421356237309505
    { x: 300, y: 200, timestamp: 2000 }, //  x:100  y:-100  total:141.421356237309505
    { x: 400, y: 100, timestamp: 3000 }, //  x:100  y:-100  total:141.421356237309505
    { x: 500, y: 700, timestamp: 4000 }, //  x:100  y:600   total:608.276253029821969
    { x: 600, y: 600, timestamp: 5000 }, //  x:100  y:-100  total:141.421356237309505
    { x: 700, y: 500, timestamp: 6000 }, //  x:100  y:-100  total:141.421356237309505
    { x: 800, y: 400, timestamp: 7000 }, //  x:100  y:-100  total:141.421356237309505
    { x: 900, y: 300, timestamp: 8000 }, //  x:100  y:-100  total:141.421356237309505
    { x: 100, y: 200, timestamp: 9000 }, //  x:-800 y:-100  total:806.225774829854965
    { x: 200, y: 100, timestamp: 10000 }, // x:100  y:-100  total:141.421356237309505
  ];

  // total x: 1700
  // total y: 1500
  // total: 2545.872877758152974

  // total time: 10000

  test('gets the average velocity', () => {
    const series = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 0,
      width: 1000,
      height: 1000,
    });

    expect(series.getAverageVelocity()).toBe(2545.872877758152974 / 10000);
  });

  test('gets the average directional velocity', () => {
    const series = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 0,
      width: 1000,
      height: 1000,
    });

    expect(series.getAverageVelocity({ which: 'x' })).toBe(1700 / 10000);
    expect(series.getAverageVelocity({ which: 'y' })).toBe(1500 / 10000);
  });
});
