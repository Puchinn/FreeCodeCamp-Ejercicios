import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

const datos = await fetch(url).then((data) => data.json());

const chart = () => {
  const width = 800;
  const height = 550;
  const margin = 40;

  const svg = d3.create("svg").attr("width", width).attr("height", height);
  const tooltip = d3
    .select("#app")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip");

  const x = d3
    .scaleUtc()
    .domain([
      new Date(`${d3.min(datos, (d) => d.Year - 1)}-01-01`),
      new Date(`${d3.max(datos, (d) => d.Year + 1)}-01-01`),
    ])
    .range([margin + 20, width - margin]);

  const timeFormat = d3.timeFormat("%M:%S");

  const y = d3
    .scaleTime()
    .domain([
      new Date(`2000-12-17T00:${datos[0].Time}`),
      new Date(`2000-12-17T00:${datos[datos.length - 1].Time}`),
    ])
    .range([margin + 10, height - margin]);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin})`)
    .call(d3.axisBottom(x))
    .attr("id", "x-axis");

  svg
    .append("g")
    .attr("transform", `translate(${margin + 20},0)`)
    .call(d3.axisLeft(y).tickFormat(timeFormat))
    .attr("id", "y-axis");

  svg
    .selectAll("circle")
    .data(datos)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cy", (d) => y(new Date(`2000-12-17T00:${d.Time}`)))
    .attr("cx", (d) => x(new Date(`${d.Year}-01-01`)))
    .attr("r", 7.5)
    .attr("fill", (d) =>
      d.Doping ? "rgba(50,50,255,.6)" : "rgba(240, 114, 65,.6)"
    )
    .attr("data-xvalue", (d) => new Date(`${d.Year}-01-01`))
    .attr("data-yvalue", (d) => new Date(`2000-12-17T00:${d.Time}`))
    .attr("stroke", "#000")
    .on("mouseover", (event, data) => {
      tooltip
        .html(
          `
        <p>${data.Name}: ${data.Nationality}</p>
        <p>Year: ${data.Year}, Time: ${data.Time}</p>
        <p>${data.Doping}</p>
        `
        )
        .style("top", `${event.pageY}px`)
        .style("left", `${event.pageX + 10}px`)
        .style("display", "block")
        .attr("data-year", new Date(`${data.Year}-01-01`));
    })
    .on("mouseout", () => {
      tooltip.html("").style("display", "none");
    });

  svg
    .append("text")
    .text("Doping in Professional Bicycle Racing")
    .attr("transform", `translate(${width / 2},${margin / 2})`)
    .style("font-size", "28px")
    .attr("text-anchor", "middle")
    .attr("id", "title");

  svg
    .append("text")
    .text("35 Fastest times up Alpe d'Huez")
    .attr("transform", `translate(${width / 2},${margin})`)
    .style("font-size", "18px")
    .attr("text-anchor", "middle");

  svg
    .append("text")
    .text("Time in Minutes")
    .attr("transform", "rotate(270)")
    .attr("y", 15)
    .attr("x", -230)
    .style("font-size", "19px");

  svg
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("transform", `translate(${width - margin},200)`)
    .attr("fill", "rgba(50,50,255,.9)");

  svg
    .append("text")
    .text("Riders with doping allegations")
    .style("text-anchor", "end")
    .style("font-size", "12px")
    .attr("transform", `translate(${width - margin - 10},215)`)
    .attr("id", "legend");

  svg
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("transform", `translate(${width - margin},175)`)
    .attr("fill", "rgba(240, 114, 65,.9)");

  svg
    .append("text")
    .text("No doping allegations")
    .style("text-anchor", "end")
    .style("font-size", "12px")
    .attr("transform", `translate(${width - margin - 10},190)`)
    .attr("id", "legend");

  return svg.node();
};

d3.select("#app").append(chart);
