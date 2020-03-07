function buildCort(sample) {
  d3.json("./static/data/NBAdataJSON.json").then(function(nbaData) {
    var sorted_year = [];
    for (var i=0, len = nbaData.length; i < len; i++) {
      if (nbaData[i].draft_year == sample) {
        sorted_year.push(nbaData[i]);
      };
    };   
  // Data which we will be using to build our chart
  var positions = {
    "PG":{"x": 320, "y": 100},
    "SG":{"x": 150, "y": 150},
    "SF":{"x": 480, "y": 430},
    "PF":{"x": 180, "y": 400},
    "CT":{"x": 420, "y": 350}
  }
  // Append the SVG wrapper to the page, set its height and width, and create a variable which references it
  var svg = d3.select("#court")
    .append("svg")
    .attr("height", "500")
    .attr("width", "600");

  // drawing the court
  var chartGroup = svg.append("g")

  chartGroup.append("rect")
    .classed("court", true) // for bonus
    .attr("width", 600)
    .attr("height", 500)
    .attr("x", 0)
    .attr("y", 0);

    chartGroup.append("line")
  .classed("court", true)
  .attr("x1", 60)
  .attr("y1", 440)
  .attr("x2", 60)
  .attr("y2", 498);

  chartGroup.append("line")
  .classed("court", true)
  .attr("x1", 540)
  .attr("y1", 440)
  .attr("x2", 540)
  .attr("y2", 498);

  chartGroup.append("path")
  .attr("d", "M 60,440c10,-410,460,-410,480,1")
  .classed("court", true)

  chartGroup.append("circle")
  .classed("court", true)
  .attr("r", 70)
  .attr("cx", 300)
  .attr("cy", 215)

  chartGroup.append("circle")
  .classed("court polygon", true)
  .attr("r", 50)
  .attr("cx", 300)
  .attr("cy", 0)

  chartGroup.append("circle")
  .classed("court basket", true)
  .attr("r", 15)
  .attr("cx", 300)
  .attr("cy", 430)

  chartGroup.append("line")
  .classed("court basket glass" , true)
  .attr("x1", 265)
  .attr("y1", 450)
  .attr("x2", 335)
  .attr("y2", 450);

  chartGroup.append("polygon")
  .classed("court polygon", true) // for bonus
  .attr("points",'230,215 190,495 410,495 370,215')

  // var courtGroup = chartGroup.selectAll("#court")

  // Drawing the positions
  // for (var i=0, len = positions.length; i < len; i++) {
    
      for (let [key, value] of Object.entries(positions)) {
      chartGroup.append("circle")
      .classed(`position ${key}`, true)
      .attr("r", 20)
      .attr("cx", value.x)
      .attr("cy", value.y)
      
      
      chartGroup
      .append("text")
      .attr("class", "pText position")
      .attr("x", value.x - 10 )
      .attr("y", value.y - 10)
      .attr("dy", "1em")
      .text(`${key}`);
    };
    // };

    console.log(sorted_year);
  
// var positionGroup = chartGroup.selectAll("#position")
})
};
