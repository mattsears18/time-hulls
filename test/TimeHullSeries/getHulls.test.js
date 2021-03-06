const TimeHullSeries = require('../../lib/TimeHullSeries');

describe('TimeHullSeries.getHulls()', () => {
  test('has too few points to generate any hulls', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 200, timestamp: 100 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getHulls().length).toBe(0);
  });

  test('generates a hull even though it only has two unique points', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 100, y: 100, timestamp: 1000 },
      { x: 100, y: 200, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getHulls().length).toEqual(1);
  });

  test('generates a single hull', () => {
    const noHullPoints = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 100, y: 200, timestamp: 1000 }
    ];

    const noHullSeries = new TimeHullSeries({
      points: noHullPoints,
      period: 100,
      includeIncomplete: false
    });

    expect(noHullSeries.getHulls().length).toEqual(1);
  });

  test('gets no hulls when            period > duration, includeIncomplete = false', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, //
      { x: 100, y: 100, timestamp: 1000 }, //
      { x: 100, y: 100, timestamp: 2000 }, //
      { x: 100, y: 100, timestamp: 3000 }, //
      { x: 100, y: 100, timestamp: 4000 }, //
      { x: 100, y: 100, timestamp: 5000 }, //
      { x: 100, y: 100, timestamp: 6000 }, //
      { x: 100, y: 100, timestamp: 7000 }, //
      { x: 100, y: 100, timestamp: 8000 }, //
      { x: 100, y: 100, timestamp: 9000 }, //
      { x: 100, y: 100, timestamp: 10000 }, //
      { x: 100, y: 100, timestamp: 11000 } //
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 20000,
      includeIncomplete: false
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(0);
  });

  test('gets hulls when timestep = 0, period < duration, includeIncomplete = false (instantaneous slide)', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, //    0
      { x: 100, y: 100, timestamp: 1000 }, // 01
      { x: 100, y: 100, timestamp: 2000 }, // 012
      { x: 100, y: 100, timestamp: 3000 }, // 0123
      { x: 100, y: 100, timestamp: 4000 }, // 01234
      { x: 100, y: 100, timestamp: 5000 }, // 012345
      { x: 100, y: 100, timestamp: 6000 }, //  123456
      { x: 100, y: 100, timestamp: 7000 }, //   234567
      { x: 100, y: 100, timestamp: 8000 }, //    345678
      { x: 100, y: 100, timestamp: 9000 }, //     456789
      { x: 100, y: 100, timestamp: 10000 }, //      56789
      { x: 100, y: 100, timestamp: 11000 }, //       6789
      { x: 100, y: 100, timestamp: 12000 }, //        789
      { x: 100, y: 100, timestamp: 13000 }, //         89
      { x: 100, y: 100, timestamp: 14000 } //           9
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
      includeIncomplete: false
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(10);
    expect(hulls[0].startIndex).toBe(0);
    expect(hulls[1].startIndex).toBe(1);
    expect(hulls[2].startIndex).toBe(2);
    expect(hulls[3].startIndex).toBe(3);
    expect(hulls[4].startIndex).toBe(4);
    expect(hulls[5].startIndex).toBe(5);
    expect(hulls[6].startIndex).toBe(6);
    expect(hulls[7].startIndex).toBe(7);
    expect(hulls[8].startIndex).toBe(8);
    expect(hulls[9].startIndex).toBe(9);

    expect(hulls[0].endIndex).toBe(5);
    expect(hulls[1].endIndex).toBe(6);
    expect(hulls[2].endIndex).toBe(7);
    expect(hulls[3].endIndex).toBe(8);
    expect(hulls[4].endIndex).toBe(9);
    expect(hulls[5].endIndex).toBe(10);
    expect(hulls[6].endIndex).toBe(11);
    expect(hulls[7].endIndex).toBe(12);
    expect(hulls[8].endIndex).toBe(13);
    expect(hulls[9].endIndex).toBe(14);
  });

  test('gets hulls when timestep = 0, period < duration, includeIncomplete = true  (instantaneous slide with initial incomplete hulls)', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, //    0123
      { x: 100, y: 100, timestamp: 1000 }, // 01234
      { x: 100, y: 100, timestamp: 2000 }, // 012345
      { x: 100, y: 100, timestamp: 3000 }, //  123456
      { x: 100, y: 100, timestamp: 4000 }, //   234567
      { x: 100, y: 100, timestamp: 5000 }, //    345678
      { x: 100, y: 100, timestamp: 6000 }, //     456789
      { x: 100, y: 100, timestamp: 7000 }, //      56789
      { x: 100, y: 100, timestamp: 8000 }, //       6789
      { x: 100, y: 100, timestamp: 9000 }, //        789
      { x: 100, y: 100, timestamp: 10000 }, //        89
      { x: 100, y: 100, timestamp: 11000 } //          9
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
      includeIncomplete: true
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(10);
    expect(hulls[0].startIndex).toBe(0);
    expect(hulls[1].startIndex).toBe(0);
    expect(hulls[2].startIndex).toBe(0);
    expect(hulls[3].startIndex).toBe(0);
    expect(hulls[4].startIndex).toBe(1);
    expect(hulls[5].startIndex).toBe(2);
    expect(hulls[6].startIndex).toBe(3);
    expect(hulls[7].startIndex).toBe(4);
    expect(hulls[8].startIndex).toBe(5);
    expect(hulls[9].startIndex).toBe(6);

    expect(hulls[0].endIndex).toBe(2);
    expect(hulls[1].endIndex).toBe(3);
    expect(hulls[2].endIndex).toBe(4);
    expect(hulls[3].endIndex).toBe(5);
    expect(hulls[4].endIndex).toBe(6);
    expect(hulls[5].endIndex).toBe(7);
    expect(hulls[6].endIndex).toBe(8);
    expect(hulls[7].endIndex).toBe(9);
    expect(hulls[8].endIndex).toBe(10);
    expect(hulls[9].endIndex).toBe(11);
  });

  test('gets hulls when timestep > 0, period < duration, includeIncomplete = false (instantaneous step)', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, //
      { x: 100, y: 100, timestamp: 1000 }, //
      { x: 100, y: 100, timestamp: 2000 }, //
      { x: 100, y: 100, timestamp: 3000 }, //
      { x: 100, y: 100, timestamp: 4000 }, //  0
      { x: 100, y: 100, timestamp: 5000 }, //  0
      { x: 100, y: 100, timestamp: 6000 }, //  0
      { x: 100, y: 100, timestamp: 7000 }, //  0
      { x: 100, y: 100, timestamp: 8000 }, //  0
      { x: 100, y: 100, timestamp: 9000 }, //  01
      { x: 100, y: 100, timestamp: 10000 }, //  1
      { x: 100, y: 100, timestamp: 11000 }, //  1
      { x: 100, y: 100, timestamp: 12000 }, //  1
      { x: 100, y: 100, timestamp: 13000 }, //  1
      { x: 100, y: 100, timestamp: 14000 } //   1
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 5000,
      includeIncomplete: false
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(2);
    expect(hulls[0].startIndex).toBe(4);
    expect(hulls[1].startIndex).toBe(9);

    expect(hulls[0].endIndex).toBe(9);
    expect(hulls[1].endIndex).toBe(14);
  });

  test('gets hulls when timestep > 0, period < duration, includeIncomplete = true  (instantaneous step  with initial incomplete hull)', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, // 0
      { x: 100, y: 100, timestamp: 1000 }, // 0
      { x: 100, y: 100, timestamp: 2000 }, // 0
      { x: 100, y: 100, timestamp: 3000 }, // 0
      { x: 100, y: 100, timestamp: 4000 }, // 01
      { x: 100, y: 100, timestamp: 5000 }, //  1
      { x: 100, y: 100, timestamp: 6000 }, //  1
      { x: 100, y: 100, timestamp: 7000 }, //  1
      { x: 100, y: 100, timestamp: 8000 }, //  1
      { x: 100, y: 100, timestamp: 9000 }, //  12
      { x: 100, y: 100, timestamp: 10000 }, //  2
      { x: 100, y: 100, timestamp: 11000 }, //  2
      { x: 100, y: 100, timestamp: 12000 }, //  2
      { x: 100, y: 100, timestamp: 13000 }, //  2
      { x: 100, y: 100, timestamp: 14000 } //   2
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 5000,
      includeIncomplete: true
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(3);
    expect(hulls[0].startIndex).toBe(0);
    expect(hulls[1].startIndex).toBe(4);
    expect(hulls[2].startIndex).toBe(9);

    expect(hulls[0].endIndex).toBe(4);
    expect(hulls[1].endIndex).toBe(9);
    expect(hulls[2].endIndex).toBe(14);
  });

  test('gets hulls when timestep = 0, period > duration, includeIncomplete = true  (continuous slide)', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, //    0123456789
      { x: 100, y: 100, timestamp: 1000 }, // 0123456789
      { x: 100, y: 100, timestamp: 2000 }, // 0123456789
      { x: 100, y: 100, timestamp: 3000 }, //  123456789
      { x: 100, y: 100, timestamp: 4000 }, //   23456789
      { x: 100, y: 100, timestamp: 5000 }, //    3456789
      { x: 100, y: 100, timestamp: 6000 }, //     456789
      { x: 100, y: 100, timestamp: 7000 }, //      56789
      { x: 100, y: 100, timestamp: 8000 }, //       6789
      { x: 100, y: 100, timestamp: 9000 }, //        789
      { x: 100, y: 100, timestamp: 10000 }, //        89
      { x: 100, y: 100, timestamp: 11000 } //          9
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 20000,
      includeIncomplete: true
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(10);
    expect(hulls[0].startIndex).toBe(0);
    expect(hulls[1].startIndex).toBe(0);
    expect(hulls[2].startIndex).toBe(0);
    expect(hulls[3].startIndex).toBe(0);
    expect(hulls[4].startIndex).toBe(0);
    expect(hulls[5].startIndex).toBe(0);
    expect(hulls[6].startIndex).toBe(0);
    expect(hulls[7].startIndex).toBe(0);
    expect(hulls[8].startIndex).toBe(0);
    expect(hulls[9].startIndex).toBe(0);

    expect(hulls[0].endIndex).toBe(2);
    expect(hulls[1].endIndex).toBe(3);
    expect(hulls[2].endIndex).toBe(4);
    expect(hulls[3].endIndex).toBe(5);
    expect(hulls[4].endIndex).toBe(6);
    expect(hulls[5].endIndex).toBe(7);
    expect(hulls[6].endIndex).toBe(8);
    expect(hulls[7].endIndex).toBe(9);
    expect(hulls[8].endIndex).toBe(10);
    expect(hulls[9].endIndex).toBe(11);
  });

  test('gets hulls when timestep > 0, period > duration, includeIncomplete = true  (continuous step)', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, // 012
      { x: 100, y: 100, timestamp: 1000 }, // 012
      { x: 100, y: 100, timestamp: 2000 }, // 012
      { x: 100, y: 100, timestamp: 3000 }, // 012
      { x: 100, y: 100, timestamp: 4000 }, // 012
      { x: 100, y: 100, timestamp: 5000 }, //  12
      { x: 100, y: 100, timestamp: 6000 }, //  12
      { x: 100, y: 100, timestamp: 7000 }, //  12
      { x: 100, y: 100, timestamp: 8000 }, //  12
      { x: 100, y: 100, timestamp: 9000 }, //  12
      { x: 100, y: 100, timestamp: 10000 }, //   2
      { x: 100, y: 100, timestamp: 11000 }, //   2
      { x: 100, y: 100, timestamp: 12000 }, //   2
      { x: 100, y: 100, timestamp: 13000 }, //   2
      { x: 100, y: 100, timestamp: 14000 } //   2
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 20000,
      timestep: 5000,
      includeIncomplete: true
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(3);
    expect(hulls[0].startIndex).toBe(0);
    expect(hulls[1].startIndex).toBe(0);
    expect(hulls[2].startIndex).toBe(0);

    expect(hulls[0].endIndex).toBe(4);
    expect(hulls[1].endIndex).toBe(9);
    expect(hulls[2].endIndex).toBe(14);
  });

  test('gets non-everlapping step hulls with an incomplete initial hull', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, // 0
      { x: 100, y: 100, timestamp: 1000 }, // 0
      { x: 100, y: 100, timestamp: 2000 }, // 0
      { x: 100, y: 100, timestamp: 3000 }, //  1
      { x: 100, y: 100, timestamp: 4000 }, //  1
      { x: 100, y: 100, timestamp: 5000 }, //  1
      { x: 100, y: 100, timestamp: 6000 }, //  1
      { x: 100, y: 100, timestamp: 7000 }, //  1
      { x: 100, y: 100, timestamp: 8000 }, //  1
      { x: 100, y: 100, timestamp: 9000 }, //   2
      { x: 100, y: 100, timestamp: 10000 }, //   2
      { x: 100, y: 100, timestamp: 11000 }, //   2
      { x: 100, y: 100, timestamp: 12000 }, //   2
      { x: 100, y: 100, timestamp: 13000 }, //   2
      { x: 100, y: 100, timestamp: 14000 } //   2
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000,
      timestep: 5001,
      includeIncomplete: true
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(3);
    expect(hulls[0].startIndex).toBe(0);
    expect(hulls[1].startIndex).toBe(3);
    expect(hulls[2].startIndex).toBe(9);

    expect(hulls[0].endIndex).toBe(2);
    expect(hulls[1].endIndex).toBe(8);
    expect(hulls[2].endIndex).toBe(14);
  });

  test('gets non-everlapping step hulls', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, // 0
      { x: 100, y: 100, timestamp: 1000 }, // 0
      { x: 100, y: 100, timestamp: 2000 }, // 0
      { x: 100, y: 100, timestamp: 3000 }, //  1
      { x: 100, y: 100, timestamp: 4000 }, //  1
      { x: 100, y: 100, timestamp: 5000 }, //  1
      { x: 100, y: 100, timestamp: 6000 }, //   2
      { x: 100, y: 100, timestamp: 7000 }, //   2
      { x: 100, y: 100, timestamp: 8000 }, //   2
      { x: 100, y: 100, timestamp: 9000 }, //    3
      { x: 100, y: 100, timestamp: 10000 }, //    3
      { x: 100, y: 100, timestamp: 11000 }, //    3
      { x: 100, y: 100, timestamp: 12000 }, //     4
      { x: 100, y: 100, timestamp: 13000 }, //     4
      { x: 100, y: 100, timestamp: 14000 } //     4
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 2000,
      timestep: 2001,
      includeIncomplete: false
    });

    const hulls = hullSeries.getHulls();

    expect(hulls.length).toBe(5);
    expect(hulls[0].startIndex).toBe(0);
    expect(hulls[1].startIndex).toBe(3);
    expect(hulls[2].startIndex).toBe(6);
    expect(hulls[3].startIndex).toBe(9);
    expect(hulls[4].startIndex).toBe(12);

    expect(hulls[0].endIndex).toBe(2);
    expect(hulls[1].endIndex).toBe(5);
    expect(hulls[2].endIndex).toBe(8);
    expect(hulls[3].endIndex).toBe(11);
    expect(hulls[4].endIndex).toBe(14);
  });

  test('returns saved hull results', () => {
    const points = [
      { x: 100, y: 100, timestamp: 0 }, // 0
      { x: 100, y: 100, timestamp: 1000 }, // 0
      { x: 100, y: 100, timestamp: 2000 }, // 0
      { x: 100, y: 100, timestamp: 3000 }, //  1
      { x: 100, y: 100, timestamp: 4000 }, //  1
      { x: 100, y: 100, timestamp: 5000 }, //  1
      { x: 100, y: 100, timestamp: 6000 }, //   2
      { x: 100, y: 100, timestamp: 7000 }, //   2
      { x: 100, y: 100, timestamp: 8000 }, //   2
      { x: 100, y: 100, timestamp: 9000 }, //    3
      { x: 100, y: 100, timestamp: 10000 }, //    3
      { x: 100, y: 100, timestamp: 11000 }, //    3
      { x: 100, y: 100, timestamp: 12000 }, //     4
      { x: 100, y: 100, timestamp: 13000 }, //     4
      { x: 100, y: 100, timestamp: 14000 } //     4
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    hullSeries.hulls = ['previously calculated hulls'];

    expect(hullSeries.getHulls()).toEqual(['previously calculated hulls']);
  });

  test('creates hulls until it iterates down to startIndex = 0', () => {
    const points = [
      { x: 100, y: 100, timestamp: 22 },
      { x: 100, y: 100, timestamp: 100 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 100, y: 100, timestamp: 3000 },
      { x: 100, y: 100, timestamp: 4000 },
      { x: 100, y: 100, timestamp: 5000 },
      { x: 100, y: 100, timestamp: 6000 },
      { x: 100, y: 100, timestamp: 7000 },
      { x: 100, y: 100, timestamp: 8000 },
      { x: 100, y: 100, timestamp: 9000 },
      { x: 100, y: 100, timestamp: 10000 },
      { x: 100, y: 100, timestamp: 11000 },
      { x: 100, y: 100, timestamp: 12000 },
      { x: 100, y: 100, timestamp: 13000 },
      { x: 100, y: 100, timestamp: 14000 }
    ];

    const hullSeries = new TimeHullSeries({
      points,
      period: 5000
    });

    expect(hullSeries.getHulls()[0].startIndex).toBe(0);
    expect(hullSeries.getHulls().length).toBe(10);
  });
});
