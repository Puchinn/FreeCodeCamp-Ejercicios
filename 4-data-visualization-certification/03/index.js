import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const { monthlyVariance, baseTemperature } = await fetch(url).then((d) =>
  d.json()
);

const chart = () => {
  const width = 1600;
  const height = 780;
  const margin = 70;
  const maxHeightSvg = 580;

  const tooltip = d3
    .select("#app")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip");

  const svg = d3.create("svg").attr("width", width).attr("height", height);

  const y = d3
    .scaleBand()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .range([margin, maxHeightSvg - margin])
    .padding(0);

  const yAxis = d3
    .axisLeft()
    .scale(y)
    .tickValues(y.domain())
    .tickFormat((m) => {
      const date = new Date(0);
      date.setUTCMonth(m);
      const format = d3.utcFormat("%B");
      return format(date);
    })
    .tickSize(10, 1);

  svg
    .append("g")
    .attr("transform", `translate(${margin + 30},0)`)
    .attr("id", "y-axis")
    .call(yAxis);

  const x = d3
    .scaleBand()
    .domain(monthlyVariance.map((r) => r.year))
    .range([margin + 30, width - margin])
    .padding(0);

  const xAxis = d3
    .axisBottom()
    .scale(x)
    .tickValues(x.domain().filter((d) => d % 10 === 0))
    .tickFormat((d) => {
      const date = new Date(0);
      date.setUTCFullYear(d);
      const format = d3.utcFormat("%Y");
      return format(date);
    })
    .tickSize(10, 1);

  svg
    .append("g")
    .attr("transform", `translate(0,${maxHeightSvg - margin})`)
    .attr("id", "x-axis")
    .call(xAxis);

  const legendColors = d3.schemeRdYlBu[11].reverse();
  const legendWidth = 400;
  const legendHeight = 300 / legendColors.length;
  const variance = monthlyVariance.map((d) => d.variance);
  const minTemp = baseTemperature + d3.min(variance);
  const maxTemp = baseTemperature + d3.max(variance);

  const legendThreshold = d3
    .scaleThreshold()
    .domain(
      (function (min, max, count) {
        var array = [];
        var step = (max - min) / count;
        var base = min;
        for (var i = 1; i < count; i++) {
          array.push(base + i * step);
        }
        return array;
      })(minTemp, maxTemp, legendColors.length)
    )
    .range(legendColors);

  const legendX = d3
    .scaleLinear()
    .domain([minTemp, maxTemp])
    .range([0, legendWidth]);

  const legendXAxis = d3
    .axisBottom()
    .scale(legendX)
    .tickSize(10, 0)
    .tickValues(legendThreshold.domain())
    .tickFormat(d3.format(".1f"));

  const legend = svg
    .append("g")
    .classed("legend", true)
    .attr("id", "legend")
    .attr("transform", `translate(0,${maxHeightSvg + margin})`);

  svg
    .selectAll("rect")
    .data(monthlyVariance.map((d) => ({ ...d, month: d.month - 1 })))
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.year))
    .attr("y", (d) => y(d.month))
    .attr("width", (d) => x.bandwidth(d.year))
    .attr("height", (d) => y.bandwidth(d.month))
    .attr("fill", (d) => legendThreshold(baseTemperature + d.variance))
    .attr("class", "cell")
    .attr("data-month", (d) => d.month)
    .attr("data-year", (d) => d.year)
    .attr("data-temp", (d) => d.variance)
    .on("mouseover", (event, d) => {
      const date = new Date(d.year, d.month);
      tooltip
        .html(
          `
      ${d3.utcFormat("%Y - %B")(date)}
      <br />
      ${d3.format(".1f")(baseTemperature + d.variance)}&#8451
      <br />
      ${d3.format("+.1f")(d.variance)}&#8451
      `
        )
        .style("display", "block")
        .style("top", `${event.pageY}px`)
        .style("left", `${event.pageX}px`)
        .attr("data-year", d.year);
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
    });

  svg
    .append("text")
    .text("Monthly Global Land-Surface Temperature")
    .attr("id", "title")
    .style("font-size", "24px")
    .attr("transform", `translate(${width / 2},${(margin - 20) / 2})`)
    .style("text-anchor", "middle");

  svg
    .append("text")
    .text("1753 - 2015: base temperature 8.66℃")
    .attr("id", "description")
    .attr("transform", `translate(${width / 2},${(margin + 20) / 2})`)
    .style("font-size", "18px")
    .style("text-anchor", "middle");

  svg
    .append("text")
    .text("Months")
    .attr(
      "transform",
      `translate(${margin - 40},${maxHeightSvg / 2})rotate(-90)`
    );

  svg
    .append("text")
    .text("Years")
    .attr("transform", `translate(${width / 2}, ${maxHeightSvg - 20})`);

  legend
    .append("g")
    .selectAll("rect")
    .data(
      legendThreshold.range().map(function (color) {
        let d = legendThreshold.invertExtent(color);
        if (d[0] === null) {
          d[0] = legendX.domain()[0];
        }
        if (d[1] === null) {
          d[1] = legendX.domain()[1];
        }
        return d;
      })
    )
    .enter()
    .append("rect")
    .style("fill", (d) => legendThreshold(d[0]))
    .attr("x", (d) => legendX(d[0]))
    .attr("y", 0)
    .attr("width", (d) =>
      d[0] && d[1] ? legendX(d[1]) - legendX(d[0]) : legendX(null)
    )
    .attr("height", legendHeight);

  legend
    .append("g")
    .attr("transform", `translate(0,${legendHeight})`)
    .call(legendXAxis);

  return svg.node();
};

d3.select("#app").append(chart);
