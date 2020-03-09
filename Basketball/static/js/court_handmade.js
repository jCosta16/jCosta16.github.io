
// Data which we will be using to build our chart
var positions = [
  {"position": {"PG": "Point Guard"},"loc":{"x": 310, "y": 110}},
  {"position": {"SG": "Shooting Guard"},"loc":{"x": 145, "y": 180}},
  {"position": {"SF": "Small Forward"},"loc":{"x": 480, "y": 410}},
  {"position": {"PF": "Power Forward"},"loc":{"x": 180, "y": 400}},
  {"position": {"CT": "Center"},"loc":{"x": 400, "y": 350}}
];

for (var i=0, len = positions.length; i < len; i++) {
  var pos = positions[i].position;
  var locx = positions[i].loc.x
  for (let [key, value] of Object.entries(pos)) {
    console.log(locx);
    console.log(value);

  };
};

// Append the SVG wrapper to the page, set its height and width, and create a variable which references it
var svg = d3.select("#court-svg")
  .append("svg")
  .attr("height", "500")
  .attr("width", "600");

// drawing the court
var chartGroup = svg.append("g");

chartGroup.append('image')
.attr('link:href', './static/images/court.png')
.attr('width', 600)
.attr('height', 500)
// .attr('transform', 'rotate(90 0 0)')

// chartGroup.append("rect")
//   .classed("court", true) // for bonus
//   .attr("width", 600)
//   .attr("height", 500)
//   .attr("x", 0)
//   .attr("y", 0);

// chartGroup.append("line")
//   .classed("court", true)
//   .attr("x1", 60)
//   .attr("y1", 440)
//   .attr("x2", 60)
//   .attr("y2", 498);

// chartGroup.append("line")
//   .classed("court", true)
//   .attr("x1", 540)
//   .attr("y1", 440)
//   .attr("x2", 540)
//   .attr("y2", 498);

// chartGroup.append("path")
//   .attr("d", "M 60,440c10,-410,460,-410,480,1")
//   .classed("court", true)

// chartGroup.append("circle")
//   .classed("court", true)
//   .attr("r", 70)
//   .attr("cx", 300)
//   .attr("cy", 215)

// chartGroup.append("circle")
//   .classed("court polygon", true)
//   .attr("r", 50)
//   .attr("cx", 300)
//   .attr("cy", 0)

// chartGroup.append("polygon")
//   .classed("court polygon", true) // for bonus
//   .attr("points",'230,215 190,495 410,495 370,215')

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

var courtGroup = chartGroup.selectAll(".court")

// Drawing the positions


function buildCort(sample) {
  d3.json("./static/data/NBAdataJSON.json").then(function(nbaData) {
    var sorted_year = [];
    for (var i=0, len = nbaData.length; i < len; i++) {
      if (nbaData[i].draft_year == sample) {
        sorted_year.push(nbaData[i]);
      };
    };   

    var position_drafted = _.countBy(sorted_year, function (player) {
      return player.position;
    });
    
    var top_position = _.max(Object.keys(position_drafted), pos => position_drafted[pos]);
    
    chartGroup.selectAll(".position").remove()

    for (var i=0, len = positions.length; i < len; i++) {
      var pos = positions[i].position;
        for (let [key, value] of Object.entries(pos)) {
        
        if(value == top_position) {
               
        chartGroup.append("circle")
        .attr("class", "court position pSelect", true) 
        .attr("id", `${value}`, true)
        .attr("r", 25)
        .attr("cx", positions[i].loc.x)
        .attr("cy", positions[i].loc.y)

        chartGroup
        .append("text")
        .attr("class", "court pText pSelect")
        .attr("x", positions[i].loc.x - 12 )
        .attr("y", positions[i].loc.y - 10)
        .attr("dy", "1em")
        .text(`${key}`);

        }
        else{
          chartGroup.append("circle")
          .attr("class", "court position", true) 
          .attr("id", `${value}`, true)
          .attr("r", 20)
          .attr("cx", positions[i].loc.x)
          .attr("cy", positions[i].loc.y)
          // console.log(key.key) 

          chartGroup
          .append("text")
          .attr("class", "court pText position")
          .attr("x", positions[i].loc.x - 10 )
          .attr("y", positions[i].loc.y - 10)
          .attr("dy", "1em")
          .text(`${key}`);
        }
       
      };
    };

    // chartGroup.select(`#${top_position}`)
    // .attr("class", "position pSelect" , true)
    // .attr("r", 25);
    // // .attr("cx", value.x)
    // // .attr("cy", value.y)

    console.log(top_position);
    var positionGroup = chartGroup.selectAll(".position")
  })
};

