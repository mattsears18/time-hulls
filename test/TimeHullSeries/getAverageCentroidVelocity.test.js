const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getAverageCentroidVelocity()', () => {
  const points = [
    { x: 100, y: 400, timestamp: 0 }, //
    { x: 200, y: 300, timestamp: 1000 }, //
    { x: 300, y: 200, timestamp: 2000 }, //
    { x: 400, y: 100, timestamp: 3000 }, //
    { x: 500, y: 700, timestamp: 4000 }, //
    { x: 600, y: 600, timestamp: 5000 },
    // 0 x:375 y:416.66666666666
    { x: 700, y: 500, timestamp: 6000 },
    // 1 x:450 y:400              xd:75   yd:16.66666 total:76.829537144107394
    { x: 800, y: 400, timestamp: 7000 },
    // 2 x:525 y:383.33333333333  xd:75   yd:16.66666 total:76.829537144107394
    { x: 900, y: 300, timestamp: 8000 },
    // 3 x:600 y:366.66666666666  xd:75   yd:16.66666 total:76.829537144107394
    { x: 100, y: 200, timestamp: 9000 },
    // 4 x:500 y:400              xd:100  yd:33.33333 total:105.409255338945978
    { x: 200, y: 100, timestamp: 10000 }
    // 5 x:500 y:325              xd:0    yd:75       total:75
  ];

  // total xd: 325
  // total yd: 158.33333333333
  // total: 410.897866771268161

  // total time: 5000

  test('has no averageCentroidVelocity when no hulls are generated', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });
    expect(noHullSeries.getAverageCentroidVelocity()).toBe(0);
    expect(noHullSeries.getAverageCentroidVelocity({ which: 'x' })).toBe(0);
    expect(noHullSeries.getAverageCentroidVelocity({ which: 'y' })).toBe(0);
  });

  test('gets the average velocity', () => {
    const series = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 0,
      width: 1000,
      height: 1000
    });

    expect(series.getAverageCentroidVelocity()).toBe(0.08217957335425363);
  });

  test('gets the average directional velocity', () => {
    const series = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 0,
      width: 1000,
      height: 1000
    });

    expect(series.getAverageCentroidVelocity({ which: 'x' })).toBe(325 / 5000);
    expect(series.getAverageCentroidVelocity({ which: 'y' })).toBe(
      0.03166666666666666
    );
  });
});
