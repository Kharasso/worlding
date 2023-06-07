import React from 'react';
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const size = 600;

class CustomD3Component extends D3Component {
  initialize(node, props) {
    const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

    const path = svg.selectAll("path")
    .data(randomize)
    .join("path")
        .attr("d", area)
        .attr("fill", () => z(Math.random()));

  }

  update(props, oldProps) {
    this.svg
    .data(randomize)
    .transition()
    .delay(1000)
    .duration(1500)
    .attr("d", area)
    .end();
  }
}

export default CustomD3Component;
