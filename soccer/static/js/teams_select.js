
var sorted_league
var max_player_position
var target_team
var team_list
var league_list
// function buildMetadata(sample) {
//   team_list = []
//     d3.json("./static/data/dict_soccer_data.json").then(function(soccerdata) {
//       for (var i=0, len = soccerdata.Leagues.length; i < len; i++) {
//         if (soccerdata.Leagues[i].league_name == sample) {
//           sorted_league = (soccerdata.Leagues[i]);
//         };  
//         team_list = []
//         if (soccerdata.Leagues[i].league_name == sample){
//           var sorted_clubs = soccerdata.Leagues[i].clubs;
//           // console.log(sorted_clubs)
//           for (var i=0; i < sorted_clubs.length;++i )
//             team_list.push(sorted_clubs[i].club)
        
//         };

//         var team_selector = d3.select("#selTeam");
      
//         team_list = (Array.from(new Set(team_list))).sort()
//         team_list.forEach((team) => {
//           team_selector
//             .append("option")
//             .text(team)
//             .property("value", team);
//         });
//         console.log(team_list)
//       }; 
//       console.log(team_list)
//     });  
//   // return console.log(team_list)



// };

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
  var team_selector = d3.select("#selTeam")

  // d3.json("../dict_soccer_data.json").then(function(soccerdata) {
  d3.json("./static/data/dict_soccer_data.json").then(function(soccerdata) {
    team_list = []

    for (var i=0, len = soccerdata.Leagues.length; i < len; i++) {
      if (soccerdata.Leagues[i].league_name == sample){
        var sorted_clubs = soccerdata.Leagues[i].clubs;
        for (var i=0; i < sorted_clubs.length;++i )
          team_list.push(sorted_clubs[i].club)
          // console.log(team_list)
      }
    
      team_list = (Array.from(new Set(team_list))).sort()
      
      team_selector.text("");
      team_list.forEach((team) => {
        var short_name = "" 
        var shor_list = ["Asociacion Atletica", "Sport Club", "Futebol Clube", "Sporting Club","Sociedade Esportiva", "Esporte Clube", "Football Club", "Foot-Ball Porto Alegrense" ]
        var remove_list = ["Estudiantes", "Foot Ball Club", "Clube de Regatas do","Futebol e Regatas",  "Club de Regatas", "Godoy ", "Gimnasia", "Lorenzo"]
        if (remove_list.some(x => team.includes(x))){
          switch(team) {
            case "Clube de Regatas do Flamengo":
              short_name = "CR Flamengo"
              break
            case "Botafogo de Futebol e Regatas":
              short_name = "Botafogo FR"
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
          }
        } 
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
    // console.log(team_list)
    return team_list
  });
}


function init() {
  // Grab a reference to the dropdown select element
  // var firstSample
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

    var team_list = []
    for (var i=0, len = data.Leagues.length; i < len; i++) {
      if (data.Leagues[i].league_name == league_list[0]){
        var sorted_clubs = data.Leagues[i].clubs;
        for (var i=0; i < sorted_clubs.length;++i )
          team_list.push(sorted_clubs[i].club)
          // console.log(team_list)
      }
    };

    const firstSample = league_list[0];
    const firstTeamSample = team_list[0]


    buildTeam(firstSample)
    console.log(team_list)
    // buildMetadata(firstSample);
    buildPosition(firstTeamSample);
    // buildMap(firstSample);
    // buildPlotly(firstSample);
    // buildTeam(team_list[0])
    // return team_list, firstSample

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