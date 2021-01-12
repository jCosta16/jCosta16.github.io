var sorted_league
var max_player_position
var target_league

function buildMetadata(sample) {
    // d3.json("../dict_soccer_data.json").then(function(soccerdata) {
    d3.json("./static/data/dict_soccer_data.json").then(function(soccerdata) {

      console.log(sample)
      for (var i=0, len = soccerdata.Leagues.length; i < len; i++) {
        // console.log(soccerdata.Leagues.league_name)

        if (soccerdata.Leagues[i].league_name == sample) {
          sorted_league = (soccerdata.Leagues[i]);
        };  
        team_list = []
        if (soccerdata.Leagues[i].league_name == sample){
          var sorted_clubs = soccerdata.Leagues[i].Clubs;
          for (var i=0; i < sorted_clubs.length;++i )
            team_list.push(sorted_clubs[i].club)
        
      }

    var team_selector = d3.select("#selTeam")
      
      team_list = (Array.from(new Set(team_list))).sort()
      team_list.forEach((team) => {
        team_selector
          .append("option")
          .text(team)
          .property("value", team);
        });
      }; 
      
      // var leaguesdata = soccerdata.Leagues      
      // team_list = []
      // for (var i=0; i < soccerdata.Leagues.length;++i ){
      //   if (soccerdata.Leagues[i].league_name == sample){
      //     var sorted_clubs = soccerdata.Leagues[i].Clubs;
      //     for (var i=0; i < sorted_clubs.length;++i )
      //       team_list.push(sorted_clubs[i].club)
      //   }
      // }
    
      // team_list = (Array.from(new Set(team_list))).sort()
      // team_list.forEach((team) => {
      //   team_selector
      //     .append("option")
      //     .text(team)
      //     .property("value", team);
      //   });
    




    });  

    // target_league = []
    // if (sorted_league.Leagues){
    //   players = soccerdata.Players
    // }
    // else{soccerdata.Players.forEach((player) => {
    //     if (player.league_name == sorted_league.league_name){
    //     target_league.push(player)
    //     } })
    //     players = target_league
    // }

  // var leaguesdata = soccerdata.Leagues


  // var field_positions = []
  // for (var i=0, len = players.length; i < len; i++) {
  //   var position = players[i].field_position
  //     if (!(position in field_positions)) {
  //       field_positions.push(position)
  //       }
  // }
  // field_positions = (Array.from(new Set(field_positions)))
  // var max_field_position = []

  // field_positions.forEach((position) => {
  //   var selected_position = []
  //   var sorted_position = []
  //   for (var i=0, len = players.length; i < len; i++) {
  //     if (position == players[i].field_position) {
  //       selected_position.push(players[i]);
  //      };
  //   };
  //   max_player_position = _.max(selected_position, function (player) {
  //     return player.market_value;
  //   });
  //   max_field_position.push(max_player_position);
  //   sorted_position = selected_position.sort((a,b) => (a.market_value > b.market_value) ? -1:1).slice(0,10);
    
  // });
  // console.log(max_field_position)
  //    // Inserting metadata1
  //    var sampleMeta = d3.select("#sample-metadata").data(max_field_position).html("");
  //    max_field_position.forEach(function(player) {
  //     sampleMeta.append("p").text(`Most Valuable ${player.field_position}: `).attr("class","b")
  //     .append("span").text(`${player.name}, $${player.market_value}M from ${player.club}`)
  //     .attr("class", "n");
  //    })

};
function team_field(team_selected){
  e.preventDefault(); 
  try {
   someBug();
  } catch (e) {
   throw new Error(e.message);
  }
  return false; 
}


function short_name_func(list_reduce, team){
  for(var i=0, len = list_reduce.length; i < len; i++){
    if (team.includes(list_reduce[i])){
      value = list_reduce[i].split(" ").map((n)=>n[0]).join("")
      short_name = team.replace(list_reduce[i],value)
    }
  }
  return short_name
}



function buildTeam(sample) {
  console.log(sample)
  team_list = []
  var team_selector = d3.select("#selTeam")

  // d3.json("../dict_soccer_data.json").then(function(soccerdata) {
   d3.json("./static/data/dict_soccer_data.json").then(function(soccerdata) {
    for (var i=0, len = soccerdata.Leagues.length; i < len; i++) {
      if (soccerdata.Leagues[i].league_name == sample){
        var sorted_clubs = soccerdata.Leagues[i].clubs;
        for (var i=0; i < sorted_clubs.length;++i )
          team_list.push(sorted_clubs[i].club)
          console.log(team_list)
      }
    
    // team_selector = d3.select("#selTeam")

    team_list = (Array.from(new Set(team_list))).sort()
    console.log(team_list)

    team_selector.text("");
    team_list.forEach((team) => {
      var short_name = "" 
      var shor_list = ["Asociacion Atletica", "Sport Club", "Futebol Clube", "Sporting Club","Sociedade Esportiva", "Esporte Clube", "Football Club", "Foot-Ball Porto Alegrense" ]
      var remove_list = ["Estudiantes", "Foot Ball Club", "Clube de Regatas do", "Club de Regatas", "Godoy ", "Gimnasia", "Lorenzo"]
      if (remove_list.some(x => team.includes(x))){
        switch(team) {
          case "Clube de Regatas do Flamengo":
            short_name = "CR Flamengo"
            break
          case "Club de Regatas Vasco da Gama":
            short_name = "CR Vasco da Gama"
            break
          case "Club Deportivo Godoy Cruz Antonio Tomba":
            short_name = "CD Godoy Cruz"
            break
          case "Club de Gimnasia y Esgrima La Plata":
            short_name = "Gimnasia y Esgrima"
            break
          case "Club Atletico San Lorenzo de Almagro":
            short_name = "San Lorenzo"
            break
          case "Club Estudiantes de La Plata":
            short_name = "Estudiantes de La Plata"
            break
          default:
            short_name = "Coritiba Foot Ball Club"
      }} 
      else if (team.includes("Sport Club do Recife")){
        short_name = team
      }
      else if (team.includes("Club Atletico")){
        short_name = team.replace("Club Atletico", "")
      }
      else if (shor_list.some(x => team.includes(x))){
        short_name = short_name_func(shor_list, team)
      }
      else{
        short_name = team
      }
      team_selector
        .append("option")
        .text(short_name)
        .property("value", team);
      });
    };
  });

}


function init() {
  // Grab a reference to the dropdown select element
  var league_selector = d3.select("#selLeague");
    // Use the list of sample names to populate the select options
  d3.json("./static/data/dict_soccer_data.json").then((data) => {
    var league_list = []
    for (var i = 0; i < data.Leagues.length; i++) {
      // console.log(data.Leagues)
      var sorted_league = data.Leagues[i].league_name
        if (!(sorted_league in league_list)) {
          league_list.push(sorted_league)
          
        }
    }
    league_list = (Array.from(new Set(league_list))).sort()
    league_list.forEach((league) => {
      league_selector
        .append("option")
        .text(league)
        .property("value", league);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = league_list[0];
    // console.log(team_list)
    // buildMetadata(firstSampleL);
    // buildPosition(firstSampleL);
    // buildMap(firstSample);
    // buildPlotly(firstSample);
    
    buildTeam(firstSample)


  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildMetadata(newSample);
  // buildPosition(newSample);

  buildTeam(newSample)

  // updateMap(newSample);  
  // buildPlotly(newSample);
};

// Initialize the dashboard
init();