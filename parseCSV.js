$.ajax({
    type: "GET",
    url: "sfpd_data.csv",
    dataType: "text",
    success: function(data) {
        parseCSV(data);
    }
});


/* This function goes through the data from the given CSV file
*  and puts it in a multidimensional array.
*/
var csvData = [];

function parseCSV(data) {
var allLines = data.split(/\n|\n\r/);
csvData = [];

// loop through all the lines to sort data into single incidents
for (var i = 1; i < allLines.length; i++) {
    var line = allLines[i].split(",");
    csvData.push(line);
}
}
