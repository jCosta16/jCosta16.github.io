var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("../D3_data_journalism/assets/data/data.csv").then(function(healthData) {
    var states = []
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
      states.push(data.abbr);
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.poverty)+2])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(healthData, d => d.healthcare)+2])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "darkcyan")
    .attr("opacity", "0.4")
    .attr("stroke", "black")
    // .append("text")
    // .attr("stroke", "blue")
    // .text(d => d.abbr);

    chartGroup.append("text").attr("clip-path", .5)
    .selectAll("tspan")
    .data(healthData)
    .join("tspan").attr("class", "cText")
      .attr("x",  d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.healthcare)+5)
      .text(d => d.abbr);


    // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - (height/2))
    .attr("dy", "1em")
    .attr("class", "aText")
    .text("(%) Lacks Healthcare");

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${svgHeight - 40})`)
    .attr("class", "aText")
    .text("(%) in Poverty");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip().attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}`);
      });

      // Step 7: Create tooltip in the chart
    // ==============================

    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mousein", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    
  }).catch(function(error) {
    console.log(error);
  });
