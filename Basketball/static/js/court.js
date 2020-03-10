var court_data
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
.attr('height', 500);

chartGroup.append("circle")
  .classed("court basket", true)
  .attr("r", 15)
  .attr("cx", 300)
  .attr("cy", 430);

chartGroup.append("line")
  .classed("court glass" , true)
  .attr("x1", 265)
  .attr("y1", 450)
  .attr("x2", 335)
  .attr("y2", 450);

chartGroup.append("rect")
  .classed("court", true)
  .attr("width", 600)
  .attr("height", 500)
  .attr("x", 0)
  .attr("y", 0);

var courtGroup = chartGroup.selectAll(".court");

// Drawing the positions

var test = ["Power Forward", "Shooting Guard"]
var testpos = "Power Forward"
if(test.includes(testpos)) {
console.log("yes")
} else{
  console.log("nooooo")
}


var positions = [
  {"position": {"PG": "Point Guard"},"loc":{"x": 310, "y": 110}},
  {"position": {"SG": "Shooting Guard"},"loc":{"x": 145, "y": 180}},
  {"position": {"SF": "Small Forward"},"loc":{"x": 480, "y": 410}},
  {"position": {"PF": "Power Forward"},"loc":{"x": 180, "y": 400}},
  {"position": {"CT": "Center"},"loc":{"x": 400, "y": 350}} 
];
for(var i=0, len = positions.length; i < len; i++){
  console.log(positions[i].loc.x)
}
var tooltip = d3.select("body").append("div")	
.attr("class", "tooltip")				
.style("opacity", 0);

var positionGroup

var toolTip = d3.select("body")
.append("div")
.classed("tooltip", true);

function buildPosition(sample) {
  d3.json("./static/data/NBAdataJSON.json").then(function(nbaData) {
    var sorted_year = [];
    if (sample == "All Data"){
      sorted_year = nbaData;
    }
    else{
      for (var i=0, len = nbaData.length; i < len; i++) {
        if (nbaData[i].draft_year == sample) {
          sorted_year.push(nbaData[i]);
        };
      };   
    };
    court_data = sorted_year
    var position_drafted = _.countBy(sorted_year, function (player) {
      return player.position;
    });
    
    var top_position = multiplemax(position_drafted);
    
    // chartGroup.selectAll(".position").remove()
    var positionGroup = chartGroup.selectAll(".position");
    positionGroup.remove();

    for (var i=0, len = positions.length; i < len; i++) {
      var pos = positions[i].position;
      var tpos = positions[i]
      for (let [key, value] of Object.entries(pos)) {
        
        if(top_position[0].includes(value)) {
              
        chartGroup.append("circle")
        .attr("class", "position pSelect", true) 
        .attr("id", `${value}`, true)
        .attr("r", 25)
        .attr("cx", positions[i].loc.x)
        .attr("cy", positions[i].loc.y)
        .on("mouseover", function(d) {	
          console.log(value)	
          toolTip.style("opacity", .9)
          .attr("class", "tooltip pSelect");		
              toolTip	.html(`<strong>${value}</strong><hr>Players drafted:<br>${top_position[1]}`)	
              .style("left", (d3.event.pageX) + "px")		
              .style("top", (d3.event.pageY - 28) + "px");	
          })					
         .on("mouseout", function(d) {		
        toolTip.transition()		
              .duration(500)		
              .style("opacity", 0);	
       });

        chartGroup
        .append("text")
        .attr("class", "position pText pSelect")
        .attr("x", positions[i].loc.x - 14 )
        .attr("y", positions[i].loc.y - 12)
        .attr("dy", "1em")
        .text(`${key}`);

        
        }
        else{
          chartGroup.append("circle")
          .attr("class", "position", true) 
          .attr("id", `${value}`, true)
          .attr("r", 20)
          .attr("cx", positions[i].loc.x)
          .attr("cy", positions[i].loc.y)
          .on("mouseover", function(d) {	
            console.log(value)	
            toolTip.style("opacity", .9)
            .attr("class", "tooltip");		
                toolTip	.html(`<strong>${value}</strong><hr>Players drafted:<br>${position_drafted[value]}`)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
           .on("mouseout", function(d) {		
          toolTip.transition()		
                .duration(500)		
                .style("opacity", 0);	
          });;

          chartGroup
          .append("text")
          .attr("class", "pText position")
          .attr("x", positions[i].loc.x - 10 )
          .attr("y", positions[i].loc.y - 10)
          .attr("dy", "1em")
          .text(`${key}`);

        };
        
        var positionGroup = chartGroup.selectAll(".position")
        // .data(tpos);
        
        // Step 2: Create "mouseover" event listener to display tooltip
      //   positionGroup.on("mouseover", function(positions) {	
      //     console.log(positions.loc)	
      //     toolTip.style("opacity", .9);		
      //         toolTip	.html(loc + "<br/>")	
      //         .style("left", (d3.event.pageX) + "px")		
      //         .style("top", (d3.event.pageY - 28) + "px");	
      //     })					
      //    .on("mouseout", function(d) {		
      //   toolTip.transition()		
      //         .duration(500)		
      //         .style("opacity", 0);	
      // });
      };
    };
    
    
    
  }).catch(function(error) {
    console.log(error);
  });
};

