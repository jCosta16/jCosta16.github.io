var new_data;
function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  d3.json("./static/data/NBAdataJSON.json").then(function(nbaData) {
    var sorted_year = [];
    for (var i=0, len = nbaData.length; i < len; i++) {
      if (nbaData[i].draft_year == sample) {
        sorted_year.push(nbaData[i]);
      };
    };   

    // find the player highest salary for that years draft
    var maxSalary = _.max(sorted_year, function (player) {
      return player.salary;
    });
    // most drafted position
    var position_drafted = _.countBy(sorted_year, function (player) {
      return player.position;
    });
    
    var top_position = _.max(Object.keys(position_drafted), pos => position_drafted[pos]);
    
    // var top_position = position_drafted[position_index];
   
    var salary_index = sorted_year.indexOf(maxSalary); 
    var high_salary = sorted_year[salary_index];
    
    // Inserting metadata
    var sampleMeta = d3.select("#sample-metadata").html("");
    sampleMeta.append("p").text(`Highest salary: ${high_salary.name}`);
    sampleMeta.append("p").text(`Top Position: ${top_position}`);

    // console.log(JSON.stringify(sorted_year));
    new_data = sorted_year;
    console.log(new_data)
    // export {sorted_year}; // a list of exported variables
  });
};



function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
  d3.json("./static/data/NBAdataJSON.json").then((data) => {
    var year_list = []
    for (var i = 0; i < data.length; i++) {
      var player_year = data[i].draft_year
        if (!(player_year in year_list)) {
          year_list.push(player_year)
          
        }
    }
    year_list = (Array.from(new Set(year_list))).sort()


    // for (var i=0; i < year_list.length; i++) {
      year_list.reverse().forEach((year) => {
        selector
          .append("option")
          .text(year)
          .property("value", year);
      });
    // }
    // Use the first sample from the list to build the initial plots
    const firstSample = year_list.reverse()[year_list.length -1];
    // buildCharts(firstSample);
    buildMetadata(firstSample);
    buildCort(firstSample);

  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newSample);
  buildMetadata(newSample);
  buildCort(newSample);
  
};

// Initialize the dashboard
init();