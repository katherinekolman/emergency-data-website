/**
 * This file contains all the functions related to obtaining data for the charts and graphs.
 */

/**
 * This function gets the number of occurences of a incident type and sorts it
 * by time of day within hour long intervals starting at the half-hour mark (for
 * example, every incident that occured between 11:30 PM and 12:30 AM is
 * considered to occur at 12 AM).
 *
 * @param type The incident type to get times for.
 * @return     An array containing the number of occurences of the desired type
 *             sorted by time of day.
 */
function getIncidentTimeData(type) {
    let i = 0;
    let temp = [];
    let time = [];
    let incidentTimes = [];
    let numOccurences = [];
    let data = getCategoryData(type);

    for (i = 0; i < data.length; i++) {
        temp = data[i][2].split(" ");
        temp = temp[1].split(/:| /);
        time.push(temp);
    }

    // This array holds all the number of occurences with the indices
    // corresponding to the 24 hour clock (for example, index 0 is 12AM, while
    // index 17 is 17:00, or 5PM).
    for (i = 0; i < 24; i++) {
        numOccurences.push(0);
    }

    // counts up the number of occurences
    for (i = 0; i < data.length; i++) {
        if (parseInt(time[i][1]) < 30) {
            numOccurences[parseInt(time[i][0])] += 1;
        } else {
            if (parseInt(time[i][0]) + 1 < 24) {
                numOccurences[parseInt(time[i][0]) + 1] += 1;
            } else {
                numOccurences[0] += 1;
            }
        }
    }
    return numOccurences;
}

/**
 * This function calculates the average resolution time for each call type.
 *
 * @return An array containing the average resolution time in minutes for each call type.
 */
function getResolutionTime() {
    let i = 0;
    let j = 0;
    let timeData = [];
    let resolutionData = []; // holds the average resolution type of each element (indices correspond to type)
    let temp = [];
    let temp1 = [];
    let callTypes = ['Alarms', 'Citizen Assist / Service Call', 'Electrical Hazard', 'Elevator / Escalator Rescue', 'Fuel Spill',
                     'Gas Leak (Natural and LP Gases)', 'HazMat', 'Medical Incident', 'Odor (Strange / Unknown)', 'Other',
                     'Outside Fire', 'Smoke Investigation (Outside)', 'Structure Fire', 'Traffic Collision', 'Train / Rail Incident',
                     'Vehicle Fire', 'Water Rescue'];

    for (i = 1; i < csvData.length - 1; i++) {
        temp = [];
        temp1 = [];
        if (csvData[i][5].length > 1 && csvData[i][6].length > 1) {
            temp.push(csvData[i][0]); // call type
            temp1.push(csvData[i][5]); // on scene timestamp
            temp1.push(csvData[i][6]); // available timestamp
            temp.push(temp1);
            timeData.push(temp);
        }
    }

    temp = [];
    for (i = 0; i < timeData.length; i++) {
        temp.push(calcTimeDiff(timeData[i][1]));
        if (temp[0] > 500) { // gets rid of invalid values
            temp = [];
            continue;
        }
        timeData[i][1] = temp[0];
        temp = [];
    }

    // initialize the size of resolutionData to the number of call types
    // with the indices corresponding to a call type
    for (i = 0; i < 17; i++) {
        resolutionData.push([]);
    }

    for (i = 0; i < timeData.length; i++) {
        for (j = 0; j < callTypes.length; j++) {
            if (timeData[i][0] == callTypes[j]) {
                resolutionData[j].push(timeData[i][1]);
            }
        }
    }

    for (i = 0; i < resolutionData.length; i++) {
        resolutionData[i] = average(resolutionData[i]);
    }

    return resolutionData;
}

/**
 * This function gets the average amount of time for responders to arrive at a location,
 * sorted by zipcodes.
 *
 * @return An array containing the average dispatch times sorted by zipcodes.
 */
function getAvgDispatchTime() {
    let i = 0;
    let avgDispatch = [];
    let temp = [];
    let temp1 = [];

    for (i = 0; i < csvData.length - 1; i++) {
        temp = [];
        temp1 = [];
        if (csvData[i][3].length > 0 && csvData[i][5].length > 0 && csvData[i][9].length > 0) {
            temp1.push(csvData[i][3]);
            temp1.push(csvData[i][5]);
            temp.push(temp1);
            temp.push(csvData[i][9]); // zipcodes
            avgDispatch.push(temp);
        }
    }

    temp = [];
    for (i = 0; i < avgDispatch.length; i++) {
        temp.push(calcTimeDiff(avgDispatch[i][0]));
        if (temp[0] > 500) { // gets rid of invalid times
            avgDispatch[i][0] = 0;
            temp = [];
            continue;
        } else {
            avgDispatch[i][0] = temp[0];
            temp = [];
        }
    }

    avgDispatch = sortByZipcode(avgDispatch);

    return avgDispatch;
}

/**
 * This function takes in the data from getAvgDispatchTime() and sorts the data by
 * zipcode, then averages the times.
 *
 * @return An array containing the average dispatch time sorted by zipcode.
 */
function sortByZipcode(data) {
    let i = 0;
    let zipcodeData = [];

    for (i = 0; i < 27; i++) {
        zipcodeData[i] = [];
    }

    for (i = 0; i < data.length; i++) {
        switch (data[i][1]) {
            case "94102":
                zipcodeData[0].push(data[i][0]);
                break;
            case "94103":
                zipcodeData[1].push(data[i][0]);
                break;
            case "94104":
                zipcodeData[2].push(data[i][0]);
                break;
            case "94105":
                zipcodeData[3].push(data[i][0]);
                break;
            case "94107":
                zipcodeData[4].push(data[i][0]);
                break;
            case "94108":
                zipcodeData[5].push(data[i][0]);
                break;
            case "94109":
                zipcodeData[6].push(data[i][0]);
                break;
            case "94110":
                zipcodeData[7].push(data[i][0]);
                break;
            case "94111":
                zipcodeData[8].push(data[i][0]);
                break;
            case "94112":
                zipcodeData[9].push(data[i][0]);
                break;
            case "94114":
                zipcodeData[10].push(data[i][0]);
                break;
            case "94115":
                zipcodeData[11].push(data[i][0]);
                break;
            case "94116":
                zipcodeData[12].push(data[i][0]);
                break;
            case "94117":
                zipcodeData[13].push(data[i][0]);
                break;
            case "94118":
                zipcodeData[14].push(data[i][0]);
                break;
            case "94121":
                zipcodeData[15].push(data[i][0]);
                break;
            case "94122":
                zipcodeData[16].push(data[i][0]);
                break;
            case "94123":
                zipcodeData[17].push(data[i][0]);
                break;
            case "94124":
                zipcodeData[18].push(data[i][0]);
                break;
            case "94127":
                zipcodeData[19].push(data[i][0]);
                break;
            case "94129":
                zipcodeData[20].push(data[i][0]);
                break;
            case "94130":
                zipcodeData[21].push(data[i][0]);
                break;
            case "94131":
                zipcodeData[22].push(data[i][0]);
                break;
            case "94132":
                zipcodeData[23].push(data[i][0]);
                break;
            case "94133":
                zipcodeData[24].push(data[i][0]);
                break;
            case "94134":
                zipcodeData[25].push(data[i][0]);
                break;
            case "94158":
                zipcodeData[26].push(data[i][0]);
                break;
        }
    }

    for (i = 0; i < zipcodeData.length; i++) {
        zipcodeData[i] = average(zipcodeData[i]);
    }

    return zipcodeData;
}
