var soccerdata
var max_line_up

 
// Append the SVG wrapper to the page, set its height and width, and create a variable which references it
var svg = d3.select("#stadium_svg")
.append("svg")
.attr("viewBox","0 0 450 600")
.attr("perserveAspectRatio","xMinYMid")
.attr("height", "100%")
.attr("width", "100%");

var img_positions = [
{"Position":"GLK", "x": 195, "y": 505},
{"Position":"LD","x": 45, "y": 425}, 
{"Position":"ZD", "x": 150, "y": 425},
{"Position":"ZE", "x": 250, "y": 425},
{"Position":"LE","x": 350, "y": 425},
{"Position":"MD","x": 45, "y": 265},
{"Position":"MCE","x": 250, "y": 265},
{"Position":"ME","x": 350, "y": 265},
{"Position":"MCD","x": 150, "y": 265},
{"Position":"ATTD", "x": 250, "y": 100},
{"Position":"ATTE", "x": 150, "y": 100},
];

// drawing the field
var chartGroup = svg.append("g");

chartGroup.append('image')
.attr('link:href', './static/images/Campofutebol.png')
.attr('width', '100%')
.attr('height', '100%')
.classed("field");

// Creating ToolTip var
var toolTip = d3.select("body")
.append("div")
.classed("tooltip", true);

function buildPosition(sample) {
  d3.json("./static/data/data1.json").then(function(soccerdata) {
    var sorted_league = [];
    if (sample == "All Leagues"){
      sorted_league = soccerdata;
    }
    else{
      for (var i=0, len = soccerdata.length; i < len; i++) {
        if (soccerdata[i].league_name == sample) {
          sorted_league.push(soccerdata[i]);
        };
      };   
    }; 
    court_data = sorted_league
 
// Field Postions 
  var field_positions = []
  for (var i=0, len = soccerdata.length; i < len; i++) {
    var position = soccerdata[i].field_position
      if (!(position in field_positions)) {
        field_positions.push(position)
        }
  }
  field_positions = (Array.from(new Set(field_positions)))
  // console.log(field_positions)

// Players Positions
  // var players_positions = []
  // for (var i=0, len = soccerdata.length; i < len; i++) {
  //   var position = soccerdata[i].position
  //     if (!(position in field_positions)) {
  //       players_positions.push(position)
  //       }
  // }
  // players_positions = (Array.from(new Set(players_positions)))
  // console.log(players_positions)

  max_line_up = []

  field_positions.forEach((position) => {
    var selected_position = []
    var sorted_position = []
    for (var i=0, len = sorted_league.length; i < len; i++) {
      if (position == sorted_league[i].field_position) {
        selected_position.push(sorted_league[i])
       }
    }

    sorted_position = selected_position.sort((a,b) => (a.market_value > b.market_value) ? -1:1).slice(0,5);
    switch(position) {
      case "GLK":
        max_line_up.push(sorted_position[0])
        break;
      case "DEF":
        max_line_up.push(sorted_position[0])
        max_line_up.push(sorted_position[1])
        max_line_up.push(sorted_position[2])
        max_line_up.push(sorted_position[3])
        break;
      case "MID":
        max_line_up.push(sorted_position[0])
        max_line_up.push(sorted_position[1])
        max_line_up.push(sorted_position[2])
        max_line_up.push(sorted_position[3])
        break;
      default:
        max_line_up.push(sorted_position[0])
        max_line_up.push(sorted_position[1])
    }
      
  });

  for (var i=0, len = img_positions.length; i < len; i++) {
    img_positions[i].data = max_line_up[i]
    };

  // Clear players and Tables
  var positionGroup = chartGroup.selectAll(".position");
  positionGroup.remove();



  // Drawing the Players
  
  img_positions.forEach(function(player) {
  chartGroup.append("image")
  .attr('link:href', player.data.logo_img)
  .classed(`field position ${player.Position}`, true)
  .attr('height', 60)
  .attr("x", player.x)
  .attr("y", player.y)
  .on("mouseover", function(d) {	
    toolTip.style("opacity", .9)
    .attr("class", "tooltip");		
        toolTip	.html(`<strong>${player.data.name}</strong>
        <br>Market Value: <strong>$${player.data.market_value}M</strong>
        <br>Position: <strong>${player.data.position}</strong>`)	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 28) + "px");	
    })					
  .on("mouseout", function(d) {
    toolTip.transition()		
    .duration(100)		
    .style("opacity", 0);	
  });  
   })
  
  var courtGroup = chartGroup.selectAll(".field");

// Creating Tables

  var tb_11 = d3.select("#team-table");
  var detail_table = d3.select("#table-detail") 

  var tables = d3.selectAll(".tgroup");
  tables.remove();

  img_positions.forEach(function(player) {
    // Small table
    tb_11.append("td")
    .text(player.data.name)
    .attr("class", "n tgroup");

    tb_11.append("td")
    .text(player.data.position)
    .attr("class", "n tgroup");

    tb_11.append("td")
    .text(`$${player.data.market_value}M`)
    .attr("class", "n tgroup text-center");
    tb_11.append("tr")

    // detail table
    

    detail_table.append("td")
    .text(player.data.name)
    .attr("class", "n tgroup");

    detail_table.append("td")
    .text(player.data.position)
    .attr("class", "n tgroup");

    detail_table.append("td")
    .text(player.data.age)
    .attr("class", "n tgroup");

    detail_table.append("td")
    .text(player.data.nat)
    .attr("class", "n tgroup");

    detail_table.append("td")
    .text(player.data.club)
    .attr("class", "n tgroup");

    detail_table.append("td")
    .text(player.data.league_name)
    .attr("class", "n tgroup");

    detail_table.append("td")
    .text(`$${player.data.market_value}M`)
    .attr("class", "n tgroup text-center");
    
    detail_table.append("tr")


  });

  }).catch(function(error) {
    console.log(error);
  });
};




