const TimeHull = require('../../lib/TimeHull')
var expect     = require('chai').expect

describe('TimeHull.area()', () => {
  it('gets an area without passing options', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.area()).to.equal(10000)
  })

  it('gets an area with no inner points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.area({})).to.equal(10000)
  })

  it('gets an area with inner points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 4000 },
      { x: 110, y: 190, timestamp: 5000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.area({})).to.equal(10000)
  })

  it('only has one point', () => {
    let points = [
      { x: 1337, y: 137, timestamp: 0 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.area({})).to.equal(0)
  })

  it('only has two points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.area({})).to.equal(0)
  })

  it('has three points but less than three unique', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.area({})).to.equal(0)
  })

  it('has three unique points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 100, y: 200, timestamp: 2000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.area({})).to.equal(5000)
  })

  it('has three unique but colinear points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 200, timestamp: 1000 },
      { x: 300, y: 300, timestamp: 2000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.area({})).to.equal(0)
  })

  it('gets the area of a custom set of points', () => {
    let dummyPoints = [{ x: 1, y: 1, timestamp: 1000 }]
    let timeHull = new TimeHull({ seriesPoints: dummyPoints })

    let points = [
      { x: 0,   y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 100 },
      { x: 0,   y: 100 },
    ]

    expect(timeHull.area({ points: points })).to.equal(30000)
  })

  it('gets the area of a custom set of points with inner points', () => {
    let dummyPoints = [{ x: 1, y: 1, timestamp: 1000 }]
    let timeHull = new TimeHull({ seriesPoints: dummyPoints })

    let points = [
      { x: 0,   y: 0 },
      { x: 300, y: 0 },
      { x: 300, y: 100 },
      { x: 0,   y: 100 },
      { x: 150, y: 80 },
      { x: 10,  y: 10 },
      { x: 200, y: 20 },
    ]

    expect(timeHull.area({ points: points })).to.equal(30000)
  })
})
