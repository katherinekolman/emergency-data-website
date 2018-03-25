// gets the location of incidents of each call type
var callTypes = ['Alarms', 'Citizen Assist / Service Call', 'Electrical Hazard', 'Elevator / Escalator Rescue', 'Fuel Spill',
    'Gas Leak (Natural and LP Gases)', 'HazMat', 'Medical Incident', 'Odor (Strange / Unknown)', 'Other',
    'Outside Fire', 'Smoke Investigation (Outside)', 'Structure Fire', 'Traffic Collision', 'Train / Rail Incident',
    'Vehicle Fire', 'Water Rescue'
];

function getCategoryData(csvData, type) {
    var temp = [];
    var locData = [];

    switch (type) {
        case "alarm":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Alarms") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "citizen":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Citizen Assist / Service Call") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "elehaz":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Electrical Hazard") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "elerescue":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Elevator / Escalator Rescue") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "fuel":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Fuel Spill") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "gas":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Gas Leak (Natural and LP Gases)") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "hazmat":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "HazMat") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "medinc":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Medical Incident") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "odor":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Odor (Strange / Unknown)") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "other":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Other") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "outfire":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Outside Fire") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "smoke":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Smoke Investigation (Outside)") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "structfire":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Structure Fire") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "traffic":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Traffic Collision") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "train":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Train / Rail Incident") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "vehicle":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Vehicle Fire") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        case "water":
            for (var i = 0; i < csvData.length; i++) {
                if (csvData[i][0] == "Water Rescue") {
                    temp.push(csvData[i][22]); // latitude
                    temp.push(csvData[i][23]); // longitude
                    temp.push(csvData[i][2]); // received timestamp
                    locData.push(temp);
                    temp = [];
                }
            }
            break;
        default:
            alert("error");
            break;
    }

    return locData;
}
