![Travis (.org)](https://img.shields.io/travis/mattsears18/time-hulls.svg)
![Coveralls github](https://img.shields.io/coveralls/github/mattsears18/time-hulls.svg)
![npm](https://img.shields.io/npm/v/time-hulls.svg?color=blue)
![npm bundle size](https://img.shields.io/bundlephobia/min/time-hulls.svg)

# time-hulls
Generates series of convex hulls for periods of timestamped, 2D point data

## Install
    npm install time-hulls

## Usage
    import { TimeHullSeries } from 'time-hulls';

    // or

    const TimeHullSeries = require("time-hulls").TimeHullSeries;
&nbsp;

    let points = []
    for(i=0; i < 300; i++) points.push({ timestamp: i*100, x: Math.random(), y: Math.random() })

    let series = new TimeHullSeries({
      points: points,
      period: 5000,
      timestep: 0,
      includeIncomplete: true,
      pointTrailLength: 10,
    })

    series.getHulls()
    series.getCentroids({})
