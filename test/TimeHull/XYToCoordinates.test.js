const TimeHull = require('../../lib/TimeHull')
var expect     = require('chai').expect

describe('TimeHull.XYToCoordinates()', () => {
  it('converts the XY to coorindates', () => {
    let dummyPoints = [{ x: 100, y: 100, timestamp: 0 }]
    let timeHull = new TimeHull({ seriesPoints: dummyPoints })

    let points = [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 200 },
      { x: 100, y: 200 },
    ]

    expect(timeHull.XYToCoordinates(points)).to.eql([
      [ 100, 100 ],
      [ 200, 100 ],
      [ 200, 200 ],
      [ 100, 200 ],
    ])
  })
})
