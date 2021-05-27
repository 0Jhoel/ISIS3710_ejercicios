import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useIntl } from "react-intl";

const GraphSeasons = (props) => {
  const canvas = useRef();
  const intl = useIntl();

  let circles = {};

  const drawChart = () => {
    const width = 800;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    let svg = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3.scaleLinear().domain([350, 0]).range([iwidth, 0]);

    const y = d3.scaleLinear().domain([12, 0]).range([0, iheight]);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

    let circleContainer = g.selectAll("circle").data(props.data).enter();

    circles = circleContainer.append("circle").style("fill", "#fcba03");

    circles
      .attr("cy", (d) => y(d.seasons))
      .attr("cx", (d) => x(d.episodes))
      .attr("r", 10)
      .attr("width", 20)
      .attr("height", 20);

    circleContainer
      .append("text")
      .attr("dx", (d) => x(d.episodes) + 15)
      .attr("dy", (d) => y(d.seasons) + 5)
      .text((d) => d.name);

    g.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", iwidth)
      .attr("y", height - 15)
      .text(intl.formatMessage({ id: "Episodes" }));

    g.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -24)
      .attr("transform", "rotate(-90)")
      .text(intl.formatMessage({ id: "Seasons" }));
  };

  useEffect(() => {
    d3.select(canvas.current).selectAll("*").remove();
    drawChart();
  }, []);

  return <div ref={canvas}></div>;
};

export default GraphSeasons;
