// from data.js
var tableData = data;
// YOUR CODE HERE!
// var dt = tableData.datetime;
// var city = tableData.city;
// var state = tableData.state;
// var country = tableData.country;
// var shape = tableData.shape;
// var dur = tableData.durationMinutes;
// var comm = tableData.comments;

// var contents = [dt, city, state, country, shape, dur, comm]


var button = d3.select("#filter-btn");

button.on("click", function() {

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log(inputValue);
  console.log(tableData);

  var filteredData = tableData.filter(event => event.datetime === inputValue);

  console.log(filteredData);

  var bodyTable = d3.select("#table-body");

  bodyTable.html("");

  insertObject(filteredData);

});



function insertObject(data) {

  // var tbl = document.getElementById('ufo-table');
  // console.log(tbl);
  var tblBody = document.getElementById("table-body");
  console.log(tblBody);
  // creates a <tbody> element
  for (var i = 0; i < data.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
    console.log(row)
    for (var prop in data[i]) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      var cellText = document.createTextNode(data[i][prop]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // // add the table body to the table
  // tbl.appendChild(tblBody);
};

insertObject(tableData);
