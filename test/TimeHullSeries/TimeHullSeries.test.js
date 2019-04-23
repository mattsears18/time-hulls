const TimeHullSeries  = require('../../lib/TimeHullSeries');
var expect            = require('chai').expect;

describe('TimeHullSeries.constructor()', () => {
  it('has undefined points', () => {
    expect(() => { new TimeHullSeries({}) }).to.throw('noPoints');
  });

  it('has empty points', () => {
    expect(() => { new TimeHullSeries({ points: [] }) }).to.throw('noPoints');
  });
});
