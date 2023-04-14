<!-- [![Build Status](https://travis-ci.org/mattsears18/time-hulls.svg?branch=master)](https://travis-ci.org/mattsears18/time-hulls) -->
[![Generic badge](https://img.shields.io/badge/Docs-Passing-1CCC1C.svg)](https://mattsears18.github.io/time-hulls/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/02990d92270f487dbfdb915bc01c1e30)](https://www.codacy.com/app/mattsears18/time-hulls?utm_source=github.com&utm_medium=referral&utm_content=mattsears18/time-hulls&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/02990d92270f487dbfdb915bc01c1e30)](https://www.codacy.com/app/mattsears18/time-hulls?utm_source=github.com&utm_medium=referral&utm_content=mattsears18/time-hulls&utm_campaign=Badge_Coverage)
![npm](https://img.shields.io/npm/v/time-hulls.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/time-hulls.svg)

# time-hulls

Generates series of convex hulls for periods of timestamped, 2D point data

## Install

    npm install time-hulls

    // or

    yarn add time-hulls

## Usage

    import { TimeHullSeries } from 'time-hulls'

    // or

    const TimeHullSeries = require("time-hulls").TimeHullSeries

    let points = []
    for(i=0; i < 300; i++) points.push({ timestamp: i*100, x: Math.random(), y: Math.random() })

    let series = new TimeHullSeries({
      points: points,
      period: 5000,
      timestep: 0,
      includeIncomplete: true,
    })

    series.getHulls()
    series.getCentroids()

## Full Documentation

<https://mattsears18.github.io/time-hulls/>
