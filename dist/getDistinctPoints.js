"use strict";function getDistinctPoints(i){for(var t=[],n=function(n){t.findIndex(function(t){return t.x===i[n].x&&t.y===i[n].y})<0&&t.push(i[n])},e=0;e<i.length;e+=1)n(e);return t}module.exports=getDistinctPoints;