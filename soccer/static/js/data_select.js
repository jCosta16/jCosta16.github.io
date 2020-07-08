
var sorted_league
var max_player_position

function buildMetadata(sample) {
  d3.json("./static/data/data1.json").then(function(soccerdata) {
    sorted_league = [];
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

    // find the most valuable Player 
    var MVP = _.max(sorted_league, function (player) {
      return player.market_value;
    });

// find the most valueble Player for each position
  var field_positions = []
  for (var i=0, len = soccerdata.length; i < len; i++) {
    var position = soccerdata[i].field_position
      if (!(position in field_positions)) {
        field_positions.push(position)
        }
  }
  field_positions = (Array.from(new Set(field_positions)))
  var max_field_position = []

  field_positions.forEach((position) => {
    var selected_position = []
    var sorted_position = []
    for (var i=0, len = sorted_league.length; i < len; i++) {
      if (position == sorted_league[i].field_position) {
        selected_position.push(sorted_league[i]);
       };
    };
    max_player_position = _.max(selected_position, function (player) {
      return player.market_value;
    });
    max_field_position.push(max_player_position);
    sorted_position = selected_position.sort((a,b) => (a.market_value > b.market_value) ? -1:1).slice(0,10);
    
  });
 
     // Inserting metadata1
     var sampleMeta = d3.select("#sample-metadata").data(max_field_position).html("");
     max_field_position.forEach(function(player) {
      sampleMeta.append("p").text(`Most Valuable ${player.field_position}: `).attr("class","b")
      .append("span").text(`${player.name}, $${player.market_value}M from ${player.club}`)
      .attr("class", "n");
     })

})
};


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
  d3.json("./static/data/data1.json").then((data) => {
    var league_list = ["All Leagues"]
    for (var i = 0; i < data.length; i++) {
      var sorted_league = data[i].league_name
        if (!(sorted_league in league_list)) {
          league_list.push(sorted_league)
          
        }
    }
    league_list = (Array.from(new Set(league_list))).sort()
   
    league_list.forEach((league) => {
      selector
        .append("option")
        .text(league)
        .property("value", league);
    });
    
    // Use the first sample from the list to build the initial plots
    const firstSample = league_list[0];
    
    buildMetadata(firstSample);
    buildPosition(firstSample);
    // buildMap(firstSample);
    // buildPlotly(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildPosition(newSample);
  
  // updateMap(newSample);  
  // buildPlotly(newSample);
};

// Initialize the dashboard
init();