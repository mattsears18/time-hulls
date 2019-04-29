const TimeHull = require('../../lib/TimeHull')
var expect     = require('chai').expect

describe('TimeHull.calculateCentroid()', () => {
  it('calculates a centroid', () => {
    let points = [
      { x: 0,   y: 0, timestamp: 0 },
      { x: 100, y: 0, timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 0,   y: 100, timestamp: 3000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.calculateCentroid(points)).to.eql({ x: 50, y: 50 })
  })

  it('calculates a centroid with a duplicate point at the end', () => {
    let points = [
      { x: 0,   y: 0,   timestamp: 0 },
      { x: 100, y: 0,   timestamp: 1000 },
      { x: 100, y: 100, timestamp: 2000 },
      { x: 0,   y: 100, timestamp: 3000 },
      { x: 0,   y: 0,   timestamp: 4000 },
    ]

    let timeHull = new TimeHull({ seriesPoints: points })
    expect(timeHull.calculateCentroid(points)).to.eql({ x: 50, y: 50 })
  })
})
