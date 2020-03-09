var year_data;
function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
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

    // find the player highest salary for that years draft
    var maxSalary = _.max(sorted_year, function (player) {
      return player.salary;
    });
    
    // most drafted position
    var position_drafted = _.countBy(sorted_year, function (player) {
      return player.position;
    });
    var college_drafted = _.countBy(sorted_year, function (player) {
      return player.college;
    });
    var top_position = _.max(Object.keys(position_drafted), pos => position_drafted[pos]);
    var top_college = _.max(Object.keys(college_drafted), col => college_drafted[col])

    var salary_index = sorted_year.indexOf(maxSalary); 
    var high_salary = sorted_year[salary_index];

    // Inserting metadata
    var sampleMeta = d3.select("#sample-metadata").html("");
    sampleMeta.append("p").text("Highest salary: ").attr("class","b")
    .append("span").text(`${high_salary.name}, ${high_salary.position} at ${high_salary.team}`).attr("class", "n");
    sampleMeta.append("p").text("Top Position: ").attr("class","b")
    .append("span").text(`${top_position}`).attr("class", "n");
    sampleMeta.append("p").text("Top College: ").attr("class","b")
    .append("span").text(`${top_college}`).attr("class", "n");

    // console.log(JSON.stringify(sorted_year));
    year_data = sorted_year;
   // console.log(new_data)
    // export {sorted_year}; // a list of exported variables
  });
};



function init() {

  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
  d3.json("./static/data/NBAdataJSON.json").then((data) => {
    var year_list = ["All Data"]
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
    
    buildMetadata(firstSample);
    buildPosition(firstSample);

  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected

  buildMetadata(newSample);
  buildPosition(newSample);

  
};

// Initialize the dashboard
init();
