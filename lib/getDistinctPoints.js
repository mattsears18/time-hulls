/**
 * [getDistinctPoints description]
 * @param  {Array}  points  [description]
 * @return {Array}          [description]
 */
function getDistinctPoints(points) {
  const distinct = [];
  for (let i = 0; i < points.length; i += 1) {
    if (
      distinct.findIndex(e => e.x === points[i].x && e.y === points[i].y) < 0
    ) {
      distinct.push(points[i]);
    }
  }
  return distinct;
}

module.exports = getDistinctPoints;
