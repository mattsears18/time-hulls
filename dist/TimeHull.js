"use strict";function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,n){for(var i=0;i<n.length;i++){var e=n[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function _createClass(t,n,i){return n&&_defineProperties(t.prototype,n),i&&_defineProperties(t,i),t}var areaPolygon=require("area-polygon"),hull=require("hull.js"),TimeHull=function(){function h(t){var n=this;_classCallCheck(this,h);var i=t||{},e=i.seriesPoints,s=i.width,o=i.height,r=i.startIndex,a=i.endIndex;if(void 0===e||!e.length)throw new Error("noSeriesPoints");this.seriesPoints=function(){return e},this.width=s||0,this.height=o||0,this.startIndex=r||0,this.endIndex=a||e.length-1,this.points=this.getSlicedPoints(),this.name=this.endTime(),this.duration=function(){return e[n.endIndex+1]?e[n.endIndex+1].timestamp-n.endTime():0}}return _createClass(h,[{key:"area",value:function(t){var n=t&&t.points||this.points,i=h.distinctPoints(this.polygon({points:n}));return i.length<3?0:areaPolygon(i)}},{key:"azimuth",value:function(){var t;if(this.points&&1<this.points.length){var n=this.points[this.points.length-2],i=this.points[this.points.length-1];n.x===i.x&&n.y===i.y?t=0:(t=90-180*Math.atan2(i.y-n.y,i.x-n.x)/Math.PI,t<0&&(t+=360))}return t}},{key:"centroid",value:function(t){var n,i=(t||{}).which,e=(t||{}).points;if(1===(e=e||this.points).length&&(n={x:e[0].x,y:e[0].y}),2===e.length&&(n={x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2}),2<e.length){var s=h.distinctPoints(this.polygon({points:e}));n=h.calculateCentroid(s)}return void 0!==i&&void 0!==n?n[i]:n}},{key:"coverage",value:function(t){var n=t&&t.points||this.points,i=t&&t.width||this.width,e=t&&t.height||this.height,s=this.area({points:n});if(0===s)return 0;if(i*e==0)throw new Error("noStimulusArea");return s/(i*e)}},{key:"coverageDuration",value:function(t){return this.coverage(t)*this.duration()}},{key:"coveragePercent",value:function(t){var n=t&&t.points||this.points;return 100*this.coverage({points:n})}},{key:"distance",value:function(t){return void 0!==t?this.points&&1<this.points.length?this.points[this.points.length-1][t]-this.points[this.points.length-2][t]:0:Math.sqrt(this.distance("x")*this.distance("x")+this.distance("y")*this.distance("y"))}},{key:"endTime",value:function(){return this.points[this.points.length-1].timestamp}},{key:"getPoints",value:function(n){return void 0!==n?this.points.map(function(t){return t[n]}):this.points}},{key:"getSlicedPoints",value:function(n){var t=this.seriesPoints().slice(this.startIndex,this.endIndex+1);return void 0!==n?t.map(function(t){return t[n]}):t}},{key:"lastPoint",value:function(){return this.points[this.points.length-1]}},{key:"period",value:function(){return this.endTime()-this.startTime()}},{key:"polygon",value:function(t){var n=t&&t.points||this.points,i=(t||{}).which,e=hull(h.XYToCoordinates(n),1/0);return e=h.coordinatesToXY(e),void 0!==i?e.map(function(t){return t[i]}):e}},{key:"startTime",value:function(){return this.points[0].timestamp}},{key:"timestep",value:function(){return this.points&&1<this.points.length?this.points[this.points.length-1].timestamp-this.points[this.points.length-2].timestamp:0}},{key:"velocity",value:function(t){return 0<this.timestep()&&0<this.distance()?this.distance(t)/this.timestep():0}}],[{key:"calculateCentroid",value:function(t){var n=t.slice();if(1===n.length)return{x:n[0].x,y:n[0].y};var i=n[0],e=n[n.length-1];i.x===e.x&&i.y===e.y||n.push(i);for(var s,o,r,a=0,h=0,u=0,l=n.length,c=0,p=l-1;c<l;c+=1)s=n[c],o=n[p],a+=r=s.x*o.y-o.x*s.y,h+=(s.x+o.x)*r,u+=(s.y+o.y)*r,p=c;return{x:h/(r=3*a),y:u/r}}},{key:"coordinatesToXY",value:function(t){return t.map(function(t){return{x:t[0],y:t[1]}})}},{key:"distinctPoints",value:function(i){for(var t=[],n=function(n){t.findIndex(function(t){return t.x===i[n].x&&t.y===i[n].y})<0&&t.push(i[n])},e=0;e<i.length;e+=1)n(e);return t}},{key:"XYToCoordinates",value:function(t){return t.map(function(t){return[t.x,t.y]})}}]),h}();module.exports=TimeHull;