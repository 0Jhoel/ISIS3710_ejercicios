const canvas = d3.select("#canvas");

const createCircleGraph = (data) => {
  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 50, bottom: 40, right: 10 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  const svg = canvas.append("svg");
  svg.attr("width", width);
  svg.attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([40000,0]).range([iwidth, 0]);

  const y = d3.scaleLinear().domain([100,0]).range([0,iheight]);

  g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);

  g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

  circles = g
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .style("fill", "steelblue");

    circles
    .attr("cy", (d) => y(d.lifeexpectancy))
    .attr("cx", (d) => x(d.purchasingpower))
    .attr("r",(d) => d.population*(12/30000000))
    .attr("width", 20)
    .attr("height", 20);
};

d3.json(
  "https://gist.githubusercontent.com/josejbocanegra/000e838b77c6ec8e5d5792229c1cdbd0/raw/83cd9161e28e308ef8c5363e217bad2b6166f21a/countries.json"
).then((data) => {
  createCircleGraph(data);
});
