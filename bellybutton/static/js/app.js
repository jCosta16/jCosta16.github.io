


function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  d3.json("samples.json").then(function(data) {
    var dataName = data.metadata
    for (var i=0, len = dataName.length; i < len; i++) {
      if (dataName[i].id == sample) {
        var gaugeNumber = dataName[i].wfreq
        var sampleMeta = d3.select("#sample-metadata").html("")
        for (let [key, value] of Object.entries(dataName[i])) {
          sampleMeta.append("p").text(`${key}: ${value}`)
        
        };
      };
    };
    
    
    // BONUS: Build the Gauge Chart
    var dataGauge = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        title: { text: "<b>BellyButton Wash Frequency</b> <br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge",
        gauge: {
          threshold: {
            line: { color: "red", width: 7 },
            thickness: .9,
            value: gaugeNumber,
          },
            axis: { tick0 : 0,
              dtick: 1,
            range: [0, 9],
                      
          },
            steps: [
            { range: [0, 1], color: "rgba(232, 226, 202, .5)"},
            { range: [1, 2], color: "rgba(220, 206, 192, .5)" },
            { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
            { range: [3, 4], color: "rgba(190, 200, 95, .5)" },
            { range: [4, 5], color: "rgba(170, 202, 42, .5)" },
            { range: [5, 7], color: "rgba(150, 170, 32, .5)" },
            { range: [6, 7], color: "rgba(80, 127, 0, .5)" },
            { range: [7, 8], color: "rgba(50, 127, 0, .5)" },
            { range: [8, 9], color: "rgba(14, 110, 0, .5)"  },
          ],
        },
                
      }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', dataGauge, layout);
   
    // buildGauge(data.WFREQ);



  });
}

function buildCharts(sample) {
  d3.json("samples.json").then(function(data) {
    var data = data.samples;
    var len = data.length
    for (var i=0; i < len; i++) {
      if (data[i].id == sample) {
        var id = data[i].id;
        var sample_values = (data[i].sample_values);
        var otu_ids = (data[i].otu_ids);
        var otu_labels = (data[i].otu_labels);
      
        // bar chart
        var dataBar = [{
          type: 'bar',
          x: sample_values.slice(0,10),
          y: otu_ids.slice(0,10).map(x => `OTU ${x}`),
          text: otu_labels.slice(0,10).map(l => `OTU ${l}`),
          orientation: 'h'
        }];
        
        Plotly.newPlot('bar', dataBar);
        
        //bubble chart
        var dataBubble = [{
          y: sample_values,
          x: otu_ids,
          // y: data[i].sample_values,
          // x: data[i].otu_ids,
          mode: 'markers',
          text: data[i].otu_labels.map(l => `OTU ${l}`),
          marker: {
            size: data[i].sample_values.map(b => b),
            color: otu_ids
          }
        }];
        
        Plotly.newPlot('bubble', dataBubble);

      }
      else{

      }
    }
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    
    // @TODO: Build a Bubble Chart using the sample data



    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    
  });  

};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    data.names.forEach((name) => {
      selector
        .append("option")
        .text(name)
        .property("value", name);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = data.names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
