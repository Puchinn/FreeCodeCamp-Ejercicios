import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const datos = await fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((d) => d.json());

const { from_date, to_date, data } = datos;

const chart = () => {
  const width = 800;
  const height = 550;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  const tooltip = d3.select("body").append("div").attr("class", "tooltip");

  const x = d3
    .scaleUtc()
    .domain([new Date(from_date), new Date(to_date)])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([height - marginBottom - 30, marginTop]);

  const svg = d3.create("svg").attr("width", width).attr("height", height);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom - 30})`)
    .call(d3.axisBottom(x));

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", "steelblue")
    .attr("x", (d) => x(new Date(d[0])))
    .attr("y", (d) => y(d[1]))
    .attr("width", 2.5)
    .attr("height", (d) => y(0) - y(d[1]))
    .attr("class", "bar")
    .on("mouseover", (d, i) => {
      tooltip
        .html(
          `<p>${i[0]}</p>
        \$ ${i[1]} Billion
        `
        )
        .style("visibility", "visible");
    })
    .on("mousemove", (e) => {
      tooltip
        .style("top", `${e.pageY - 20}px`)
        .style("left", `${e.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.html("").style("visibility", "hidden");
    });

  svg
    .append("text")
    .text("Gross Domestic Product")
    .attr("transform", "rotate(-90)")
    .attr("x", -230)
    .attr("y", 70);

  svg
    .append("text")
    .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
    .attr("y", height - 15)
    .attr("x", 350);

  return svg.node();
};

d3.select("#app").append(chart);
