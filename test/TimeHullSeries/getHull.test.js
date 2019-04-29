const TimeHullSeries = require('../../lib/TimeHullSeries')
var expect     = require('chai').expect

describe('TimeHullSeries.getHull()', () => {
  const testPoints = [
    { x: 100, y: 100, timestamp: 0 },
    { x: 100, y: 100, timestamp: 1000 },
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
  ]

  it('does not specify a hull', () => {
    let hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    })

    expect(() => { hullseries.getHull() }).to.throw('noHullSpecified')
    expect(() => { hull = hullseries.getHull({ hull: undefined }) }).to.throw('noHullSpecified')
  })

  it('gets a hull by passing a hull (confirms that the hull is a TimeHull)', () => {
    let hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    })

    let testHull = hullseries.getHulls()[3]
    let hull = hullseries.getHull({ hull: testHull })

    expect(hull.constructor.name).to.equal('TimeHull')
    expect(hull.number).to.equal(4)
  })

  it('passes an invalid hull', () => {
    let hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    })

    expect(() => { hull = hullseries.getHull({ hull: {} }) }).to.throw('invalidHull')
  })

  it('passes an invalid hullIndex', () => {
    let hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    })

    expect(() => { hull = hullseries.getHull({ hullIndex: '' }) }).to.throw('invalidHullIndex')
  })

  it('gets a hull by hullIndex', () => {
    let hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    })

    let hull = hullseries.getHull({ hullIndex: 3 })
    expect(hull.constructor.name).to.equal('TimeHull')
    expect(hull.number).to.equal(4)
  })

  it('requests an out of bounds hullIndex', () => {
    let hullseries = new TimeHullSeries({
      points: testPoints,
      period: 5000,
    })

    expect(()=> { hullseries.getHull({ hullIndex: -3 }) }).to.throw('hullIndexOutOfBounds')
    expect(()=> { hullseries.getHull({ hullIndex: 10000000 }) }).to.throw('hullIndexOutOfBounds')
  })
})
