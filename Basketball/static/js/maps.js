var myMap = L.map("map-id", {
  center: [39.0119, -98.4842],
  zoom: 5,
});

// Define variables for our tile layers


var collegeLayer = '';


function buildMap(sample) {
  

  console.log(collegeLayer);
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);

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
    // want College, Salary, Position, Team 
      // Colleges
      var college_map = _.map(sorted_year, function (college) {
        var data = college.college.split(",");
        var coll_count = data[0];
        var coll_loc = [college.lat, college.long];
        var college_d = [coll_count, coll_loc]

        return college_d
      });

      var college_total = _.countBy(college_map, function (coll) {
          return coll;
      });

      var college_data = []
      for (let [key, value] of Object.entries(college_total)) {
        var data = key.split(",");
        var lat = data[data.length -2];
        var long = data[data.length -1];
        var name = data[0, data.length -3]
        var name = data[0]

        college_data.push({"name" : name, "location" : [lat, long], "count": value}) 
      };

      // // An array which will be used to store created collegeMarkers
      var collegeMarkers = [];
      for (var i = 0; i < college_data.length; i++) {

            // loop through the cities array, create a new marker, push it to the cityMarkers array
            collegeMarkers.push(
              L.circle(college_data[i].location,college_data[i].count*10000 ).bindPopup("<b>" + college_data[i].name + "</b><hr> Players Drafted: "+ college_data[i].count)
            );
          }

      // Now we can handle them as one group instead of referencing each individually
      collegeLayer = L.layerGroup(collegeMarkers);
      collegeLayer.addTo(myMap);
      console.log(college_data)
      
      // var myMap = L.map("map-id", {
      //   center: [40.73, -74.0059],
      //   zoom: 6,
      //   // layers: [light, collegeLayer, salaryLayer, teamLayer, positionLayer,]
      // });
      
      // // Define variables for our tile layers
      // L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      //   maxZoom: 18,
      //   id: "mapbox.streets",
      //   accessToken: API_KEY
      // }).addTo(myMap);
      // // Salary
      // var salary = [
      //     {
          
      //     }
      //   ];
        
      //   // An array which will be used to store created collegeMarkers
      //   var salaryMarkers = [];
        
      //   for (var i = 0; i < salary.length; i++) {
      //     // loop through the cities array, create a new marker, push it to the cityMarkers array
      //     salaryMarkers.push(
      //       L.marker(college[i].salary).bindPopup("<h1>" + college[i].salary + "</h1>")
      //     );
      //   }
      // // Now we can handle them as one group instead of referencing each individually
      // var salaryLayer = L.layerGroup(salaryMarkers);

      // Position
      // var position =  _.countBy(sorted_year, function (player) {
      //   return player.position;
      // });
        
      //   // An array which will be used to store created collegeMarkers
      //   var positionMarkers = [];
        
      //   for (var i = 0; i < position.length; i++) {
      //     // loop through the cities array, create a new marker, push it to the cityMarkers array
      //     positionMarkers.push(
      //       L.marker(college[i].position).bindPopup("<h1>" + college[i].position + "</h1>")
      //     );
      //   }
      // // Now we can handle them as one group instead of referencing each individually
      // var positionLayer = L.layerGroup(positionMarkers);

      // // Salary
      // var NBATeam = [
      //     {
          
      //     }
      //   ];
        
      //   // An array which will be used to store created collegeMarkers
      //   var teamMarkers = [];
        
      //   for (var i = 0; i < NBATeam.length; i++) {
      //     // loop through the cities array, create a new marker, push it to the cityMarkers array
      //     teamMarkers.push(
      //       L.marker(college[i].team).bindPopup("<h1>" + college[i].team + "</h1>")
      //     );
      //   }
      // // Now we can handle them as one group instead of referencing each individually
      // var teamLayer = L.layerGroup(teamMarkers);


      // Create map object and set default layers

      // Only one base layer can be shown at a time
      // var baseMaps = {
      //   "Light": light,
      // };

      // var overlayMaps = {

      // }; 



      // Pass our map layers into our layer control
      // Add the layer control to the map
      // L.control.layers(baseMaps, overlayMaps).addTo(myMap);
      // L.control.layers(baseMaps).addTo(myMap);
  }).catch(function(error) {
    console.log(error);
  });
};

function updateMap(sample){
  myMap.removeLayer(collegeLayer);
  buildMap(sample);

}
