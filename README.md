# Assignment 2A: Practice with crossfilter.js

The purpose of this quick exercise is to get you to practice with the full range of capabilities of crossfilter.js. Please refer to the [API reference] (https://github.com/square/crossfilter/wiki/API-Reference) for detailed information on syntax.

## Parsing data

Crossfilter allows you to quickly filter, group, and reduce values of individual dimensions (tabular columns) of multi-dimensional datasets. One thing to note is that you can only filter data that can be compared i.e. with `>`,`<`,`>=`,`<=` and so on. Since `undefined` and `NaN` cannot be compared, you must not have these values in the input data to crossfilter.

