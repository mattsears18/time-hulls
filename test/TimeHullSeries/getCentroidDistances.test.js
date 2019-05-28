const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getCentroidDistances()', () => {
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

  test('gets the centroid distances', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullseries.getCentroidDistances()).toEqual([
      76.829537144107394,
      76.829537144107394,
      76.829537144107394,
      105.40925533894597,
      75
    ]);
  });

  test('gets the X point distances', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullseries.getCentroidDistances({ which: 'x' })).toEqual([75, 75, 75, 100, 0]);
  });

  test('gets the Y point distances', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullseries.getCentroidDistances({ which: 'y' })).toEqual([
      16.666666666666686,
      16.666666666666686,
      16.66666666666663,
      33.333333333333314,
      75
    ]);
  });

  test('gets previously cached distances', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    hullseries.centroidDistances = 1337;

    expect(hullseries.getCentroidDistances()).toEqual(1337);
  });

  test('has invalid centroids (NaN)', () => {
    const hullseries = new TimeHullSeries({
      points,
      period: 5000
    });

    hullseries.getHulls()[0].centroid = 'meh';
    hullseries.getHulls()[1].centroid = 'meh';

    expect(hullseries.getCentroidDistances()).toEqual([
      0,
      0,
      76.829537144107394,
      105.40925533894597,
      75
    ]);
  });
});
