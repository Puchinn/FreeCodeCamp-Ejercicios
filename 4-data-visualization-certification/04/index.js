import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const urlEducationData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

const urlStatesData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const educationData = await fetch(urlEducationData).then((d) => d.json());
const statesData = await fetch(urlStatesData).then((d) => d.json());

const chart = () => {
  const width = 1000;
  const height = 900;
  const marginTitle = 50;
  const svg = d3.create("svg").attr("width", width).attr("height", height);
  const path = d3.geoPath();

  const tooltip = d3
    .select("#app")
    .append("div")
    .attr("id", "tooltip")
    .attr("class", "tooltip");

  const x = d3.scaleLinear().domain([2.6, 75.1]).rangeRound([400, 680]);
  const color = d3
    .scaleThreshold()
    .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
    .range(d3.schemeBlues[9]);

  const g = svg
    .append("g")
    .attr("class", "key")
    .attr("id", "legend")
    .attr("transform", `translate(0,${marginTitle + 60})`);

  g.selectAll("rect")
    .data(
      color.range().map((d) => {
        d = color.invertExtent(d);
        d[0] = d[0] === null ? x.domain()[0] : d[0];
        d[1] = d[1] === null ? x.domain()[1] : d[1];
        return d;
      })
    )
    .enter()
    .append("rect")
    .attr("height", 8)
    .attr("x", (d) => x(d[0]))
    .attr("width", (d) => (d[0] && d[1] ? x(d[1]) - x(d[0]) : x(null)))
    .attr("fill", (d) => color(d[0]));

  g.call(
    d3
      .axisBottom(x)
      .tickSize(13)
      .tickFormat((x) => Math.round(x) + "%")
      .tickValues(color.domain())
  )
    .select(".domain")
    .remove();

  function ready(us, education) {
    svg
      .append("g")
      .attr("class", "counties")
      .attr("transform", `translate(0,${marginTitle * 2})`)
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter()
      .append("path")
      .attr("class", "county")
      .attr("data-fips", (d) => d.id)
      .attr("data-education", (d) => {
        const result = education.filter((obj) => obj.fips === d.id);
        return result[0].bachelorsOrHigher ?? 0;
      })
      .attr("fill", (d) => {
        const result = education.filter((obj) => obj.fips === d.id);
        return result[0] ? color(result[0].bachelorsOrHigher) : color(0);
      })
      .attr("d", path)
      .on("mouseover", (event, d) => {
        tooltip.style("display", "block");
        tooltip
          .html(() => {
            const result = education.filter((obj) => obj.fips === d.id);
            const text = `${result[0]["area_name"]}, ${result[0]["state"]}: ${result[0].bachelorsOrHigher}%`;
            return result[0] ? text : 0;
          })
          .attr("data-education", () => {
            const result = education.filter((obj) => obj.fips === d.id);
            return result[0] ? result[0].bachelorsOrHigher : 0;
          })
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });

    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("class", "states")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round");
  }

  ready(statesData, educationData);

  svg
    .append("text")
    .text("United States Educational Attainment")
    .attr("transform", `translate(${width / 2},${marginTitle})`)
    .style("text-anchor", "middle")
    .style("font-size", "40px");

  svg
    .append("text")
    .text(
      "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
    )
    .attr("transform", `translate(${width / 2},${marginTitle * 1.5})`)
    .style("text-anchor", "middle");

  return svg.node();
};

d3.select("#app").append(chart);
