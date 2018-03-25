/**
 * This function takes a category of data (incident type) and searches through the
 * already parsed csv data and pulls the latitude, longitude, and received timestamp
 * for mapData() and getIncidentTimeData().
 *
 * @param type The type of incident to pull information about.
 * @return     An array containing the all the latitudes, longitudes, and received
 *             timestamps of the desired incident type.
 */
function getCategoryData(type) {
    i = 0;
    let temp = [];
    let data = [];

    switch (type) {
        case "alarm":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Alarms") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]);  // received timestamp
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "citizen":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Citizen Assist / Service Call") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "elehaz":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Electrical Hazard") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "elerescue":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Elevator / Escalator Rescue") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "fuel":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Fuel Spill") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "gas":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Gas Leak (Natural and LP Gases)") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "hazmat":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "HazMat") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "medinc":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Medical Incident") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "odor":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Odor (Strange / Unknown)") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "other":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Other") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "outfire":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Outside Fire") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "smoke":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Smoke Investigation (Outside)") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "structfire":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Structure Fire") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "traffic":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Traffic Collision") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "train":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Train / Rail Incident") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "vehicle":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Vehicle Fire") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        case "water":
            for (i = 0; i < csvData.length; i++) {
                if (csvData[i][0] === "Water Rescue") {
                    temp.push(csvData[i][22]);
                    temp.push(csvData[i][23]);
                    temp.push(csvData[i][2]);
                    data.push(temp);
                    temp = [];
                }
            }
            break;
        default:
            alert("Error, not a valid type.");
            break;
    }
    return data;
}
