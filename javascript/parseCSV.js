$.ajax({
    type: "GET",
    url: "data/sfpd_data.csv",
    dataType: "text",
    success: function(data) {
        parseCSV(data);
    }
});

let csvData = [];

/**
 * This function goes through the data from the given CSV file and sorts it into
 * single lines.
 */
function parseCSV(data) {
    let i = 0;
    let line = "";
    let allLines = data.split(/\n|\n\r/);

    // loop through all the lines to sort data into single incidents
    for (i = 1; i < allLines.length; i++) {
        line = allLines[i].split(",");
        csvData.push(line);
    }
}
