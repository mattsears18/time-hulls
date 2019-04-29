const TimeHull = require('../../lib/TimeHull')
var expect     = require('chai').expect

describe('TimeHull.centroid()', () => {
  it('gets a centroid without passing options', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.centroid()).to.eql({ x: 150, y: 150 })
  })

  it('gets a centroid with no inner points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.centroid({})).to.eql({ x: 150, y: 150 })
  })

  it('gets a centroid with inner points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
      { x: 200, y: 200, timestamp: 2000 },
      { x: 100, y: 200, timestamp: 3000 },
      { x: 150, y: 120, timestamp: 3000 },
      { x: 110, y: 190, timestamp: 3000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.centroid({})).to.eql({ x: 150, y: 150 })
  })

  it('only has one point', () => {
    let points = [
      { x: 1337, y: 137, timestamp: 0 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.centroid({})).to.eql({ x: 1337, y: 137 })
  })

  it('only has one unique point', () => {
    let points = [
      { x: 1337, y: 137, timestamp: 0 },
      { x: 1337, y: 137, timestamp: 0 },
      { x: 1337, y: 137, timestamp: 0 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.centroid({})).to.eql({ x: 1337, y: 137 })
  })

  it('only has two points', () => {
    let points = [
      { x: 100, y: 100, timestamp: 0 },
      { x: 200, y: 100, timestamp: 1000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.centroid({})).to.eql({ x: 150, y: 100 })
  })

  it('only has three points', () => {
    let points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 50, y: 300, timestamp: 2000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.centroid({})).to.eql({ x: 50, y: 100 })
  })

  it('gets a single coordinate of the centroid', () => {
    let points = [
      { x: 0, y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 50, y: 300, timestamp: 2000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.centroid({ which: 'x' })).to.eql(50)
    expect(timeHull.centroid({ which: 'y' })).to.eql(100)
  })
})
