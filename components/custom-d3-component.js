import React from 'react';
const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const size = 600;

var n = 10, // number of layers
m = 500, // number of samples per layer
k = 12; // number of bumps per layer


class CustomD3Component extends D3Component {
  initialize(node, props) {
    const svg = (this.svg = d3.select(node).append('svg'));

    svg
    .attr('viewBox', `0 -200 ${size} ${size}`)
    .style('width', '100%')
    .style('height', 'auto');

    var width = window.innerWidth;
    
    // console.log(width);
    var height = width * 0.45;

    this.width = width;
    this.height = height;
    
    // var n = 20, // number of layers
    //     m = 500, // number of samples per layer
    //     k = 10; // number of bumps per layer
    
    
    // var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),
    //     layers0 = stack(d3.transpose(d3.range(n).map(function() { return bumps(m, k); }))),
    //     layers1 = stack(d3.transpose(d3.range(n).map(function() { return bumps(m, k); }))),
    //     layers = layers0.concat(layers1);
    
    // var svg = d3.select("svg"),
    // width = +svg.attr("width"),
    // height = +svg.attr("height");
    // width = svg.attr("width"),
    // height = svg.attr("height");
    
    var x = d3.scaleLinear([0, m - 1], [0, width]);
    
    var y = d3.scaleLinear([0, 1], [height, 0]);

    // var z = d3.interpolateCool;
    // var z = d3.interpolateBuPu;
    var z = d3.interpolateGreys;
    
    var area = d3.area()
      .x((d, i) => x(i))
      .y0(d => 0.25 * y(d[0]))
      .y1(d => 0.25 * y(d[1]))

    // const offset = function offset () {
    //   const options = [
    //     {name: "d3.stackOffsetExpand", value: d3.stackOffsetExpand},
    //     {name: "d3.stackOffsetNone", value: d3.stackOffsetNone},
    //     {name: "d3.stackOffsetSilhouette", value: d3.stackOffsetSilhouette},
    //     {name: "d3.stackOffsetWiggle", value: d3.stackOffsetWiggle, selected: true}
    //   ];
    //   const form = html`<form style="display: flex; align-items: center; min-height: 33px;"><select name=i>${options.map(o => Object.assign(html`<option>`, {textContent: o.name, selected: o.selected}))}`;
    //   form.i.onchange = () => form.dispatchEvent(new CustomEvent("input"));
    //   form.oninput = () => form.value = options[form.i.selectedIndex].value;
    //   form.oninput();
    //   return form;
    // }

    console.log(area);

    var stack = d3.stack()
    .keys(d3.range(n))
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderNone)

    const path = svg.selectAll("path")
    .data(randomize)
    .enter().append('path')
      .attr("d", area)
      .attr("fill", () => z(Math.random()))
      .attr("opacity", 0.5);

    function stackMax(layer) {
      return d3.max(layer, function(d) { return d[1]; });
    }
    
    function stackMin(layer) {
      return d3.min(layer, function(d) { return d[0]; });
    }

    // function transition() {
    //   var t;
    //   d3.selectAll("path")
    //     .data((t = layers1, layers1 = layers0, layers0 = t))
    //     .transition()
    //       .duration(2500)
    //       .attr("d", area);
    // }

    function randomize() {
      const layers = stack(d3.transpose(Array.from({length: n}, () => bumps(m, k))));
      y.domain([
        d3.min(layers, l => d3.min(l, d => d[0])),
        d3.max(layers, l => d3.max(l, d => d[1]))
      ]);
      return layers;
    }
  
    function bump(a, n) {
      var x = 1 / (0.1 + Math.random()),
          y = 2 * Math.random() - 0.5,
          z = 10 / (0.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

    function bumps(n, m) {
      var a = [], i;
      for (i = 0; i < n; ++i) a[i] = 0;
      for (i = 0; i < m; ++i) bump(a, n);
      return a;
    }
    
    

  }

  update(props, oldProps) {

    // var n = 20, // number of layers
    //     m = 300, // number of samples per layer
    //     k = 10; // number of bumps per layer

    var width = window.innerWidth;
    var height = width * 0.45;

    // console.log(width);

    function bump(a, n) {
      var x = 1 / (0.1 + Math.random()),
          y = 2 * Math.random() - 0.5,
          z = 10 / (0.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }

    function bumps(n, m) {
      var a = [], i;
      for (i = 0; i < n; ++i) a[i] = 0;
      for (i = 0; i < m; ++i) bump(a, n);
      return a;
    }

    var x = d3.scaleLinear([0, m - 1], [0, width]);
    
    var y = d3.scaleLinear([0, 1], [height, 0]);

    // var z = d3.interpolateCool;
    // var z = d3.interpolateBuPu;
    var z = d3.interpolateGreys;

    var area = d3.area()
      .x((d, i) => x(i))
      .y0(d => 0.25 * y(d[0]))
      .y1(d => 0.25 * y(d[1]))
    
    console.log(area);

    var stack = d3.stack()
    .keys(d3.range(n))
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderNone)

    function randomize() {
      const layers = stack(d3.transpose(Array.from({length: n}, () => bumps(m, k))));
      y.domain([
        d3.min(layers, l => d3.min(l, d => d[0])),
        d3.max(layers, l => d3.max(l, d => d[1]))
      ]);
      return layers;
    }
    
    this.svg.selectAll("path")
      .data(randomize)
      .transition()
      .duration(1500)
      .attr("d", area)
  }

}

export default CustomD3Component;
