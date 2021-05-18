import React from "react";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

function App() {

  const canvas = useRef();

  let bars = {};
  let x = {};
  let y = {};
  let iheight = {};

  const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 },
    { name: "Atlántico", index2005: 6, index2006: 16 },
  ];

  const buttonPressed = (e) => {
    let op = `index${e.target.firstChild.data}`;
    bars
    .attr("x", (d) => x(d.name))
    .attr("width",x.bandwidth())
    .transition()
    .duration(2000)
    .attr("y", (d) => y(d[op]))
    .attr("height", (d) => iheight - y(d[op]))
    .delay(function(d,i){return(i*100)});
  };

  const drawChart = () => {
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    iheight = height - margin.top - margin.bottom;
    let svg = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    y = d3.scaleLinear().domain([0, 45]).range([iheight, 0]);
    x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    bars = g
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue");

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
  };

  useEffect(() => {
    drawChart();
  });
  return (
    <div>
      <div ref={canvas}></div>
      <button onClick={buttonPressed}>2005</button>
      <button onClick={buttonPressed}>2006</button>
    </div>
  );
}


export default App;
