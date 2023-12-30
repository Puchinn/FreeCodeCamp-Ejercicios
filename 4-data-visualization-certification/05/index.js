import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const DATASETS = {
  videogames: {
    TITLE: "Video Game Sales",
    DESCRIPTION: "Top 100 Most Sold Video Games Grouped by Platform",
    FILE_PATH:
      "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json",
  },
  movies: {
    TITLE: "Movie Sales",
    DESCRIPTION: "Top 100 Highest Grossing Movies Grouped By Genre",
    FILE_PATH:
      "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json",
  },
  kickstarter: {
    TITLE: "Kickstarter Pledges",
    DESCRIPTION:
      "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
    FILE_PATH:
      "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json",
  },
};

const chart = (data, variable) => {
  const width = 950;
  const height = 700;
  const svg = d3.create("svg").attr("width", width).attr("height", height);

  const svgInfo = d3
    .select("#svg-info")
    .append("svg")
    .attr("width", width)
    .attr("height", 100);

  svgInfo
    .append("text")
    .text(DATASETS[variable].TITLE)
    .attr("transform", `translate(${width / 2},40)`)
    .style("font-size", "42px")
    .style("text-anchor", "middle")
    .attr("id", "title");

  svgInfo
    .append("text")
    .text(DATASETS[variable].DESCRIPTION)
    .attr("transform", `translate(${width / 2},80)`)
    .style("font-size", "22px")
    .style("text-anchor", "middle")
    .attr("id", "description");

  const tooltip = d3
    .select("#svg-app")
    .append("div")
    .attr("id", "tooltip")
    .attr("class", "tooltip");

  const color = d3.scaleOrdinal(
    data.children.map((d) => d.name),
    d3.schemeTableau10
  );
  const treemap = d3.treemap().size([width, height]).paddingInner(1.5);

  const root = d3
    .hierarchy(data)
    .eachBefore((d) => {
      d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
    })
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);

  treemap(root);

  const cell = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`)
    .on("mouseover", (e, d) => {
      tooltip
        .html(
          `
          Name: ${d.data.name} <br />
          Category: ${d.data.category} <br />
          Value: ${d.data.value}
          `
        )
        .style("display", "block")
        .style("top", `${e.pageY}px`)
        .style("left", `${e.pageX}px`)
        .attr("data-value", d.data.value);
    })
    .on("mouseout", () => tooltip.style("display", "none"));

  cell
    .append("rect")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("fill", (d) => color(d.data.category));

  cell
    .append("text")
    .attr("class", "tile-text")
    .selectAll("tspan")
    .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter()
    .append("tspan")
    .attr("x", 2)
    .attr(
      "y",
      (d, i, nodes) => `${(i === nodes.length - 1) * 0.1 + 1.1 + i * 0.9}em`
    )
    .text((d) => d)
    .style("font-size", "11px")
    .style("font-weight", "200")
    .attr("fill-opacity", "0.9");

  let categories = root.leaves().map((nodes) => nodes.data.category);
  categories = categories.filter(
    (category, index, self) => self.indexOf(category) === index
  );

  const legend = d3
    .select("#legend")
    .append("svg")
    .attr("id", "legend")
    .attr("width", 500);
  const legendWidth = legend.attr("width");
  const LEGEND_OFFSET = 10;
  const LEGEND_RECT_SIZE = 15;
  const LEGEND_H_SPACING = 150;
  const LEGEND_V_SPACING = 15;
  const LEGEND_TEXT_X_OFFSET = 3;
  const LEGEND_TEXT_Y_OFFSET = -1;
  const legendElemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

  const legendElem = legend
    .append("g")
    .attr("transform", `translate(0, ${LEGEND_OFFSET})`)
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .attr("transform", (d, i) => {
      return `
      translate(
        ${(i % legendElemsPerRow) * LEGEND_H_SPACING},
        ${
          Math.floor(i / legendElemsPerRow) * LEGEND_RECT_SIZE +
          LEGEND_V_SPACING * Math.floor(i / legendElemsPerRow)
        }
       )
        `;
    });

  legendElem
    .append("rect")
    .attr("width", LEGEND_RECT_SIZE)
    .attr("height", LEGEND_RECT_SIZE)
    .attr("class", "legend-item")
    .attr("fill", (d) => color(d));

  legendElem
    .append("text")
    .attr("x", LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
    .attr("y", LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
    .text((d) => d);

  return svg.node();
};

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetch(DATASETS.videogames.FILE_PATH).then((d) => d.json());
  d3.select("#svg-app").append(() => chart(data, "videogames"));
});

document.querySelectorAll("a").forEach((e, i) => {
  const variable = i === 0 ? "videogames" : i === 1 ? "movies" : "kickstarter";
  e.addEventListener("click", async () => {
    const data = await fetch(DATASETS[variable].FILE_PATH).then((d) =>
      d.json()
    );
    d3.select("#svg-app").html("");
    d3.select("#legend").html("");
    d3.select("#svg-info").html("");
    d3.select("#svg-app").append(() => chart(data, variable));
  });
});
