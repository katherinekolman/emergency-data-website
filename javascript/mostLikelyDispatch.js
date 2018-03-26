/**
 * This file contains all the functions related to finding the
 * most likely dispatch given an address and time.
 */

/**
 * This function takes the inputted address, finds its latitude and longitude,
 * and uses that to locate nearby addresses from the data set.
 *
 * @return Nothing if it cannot find the location, or the information inputted was invalid.
 */
function findAddress() {
    let marker;
    let addressData = [];
    let dispatchData = [];
    let adInput = $("#address_input").val();
    let bounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(37.6, -122.6),
                    new google.maps.LatLng(37.9, -122.3));

    if (adInput == 0 || $("#time_input").val() == 0) {
        $("#pred_output").html("Please enter information into the fields.");
        return;
    }

    // gets the latitude and longitude from the inputted address
    geocoder.geocode({
        address: adInput,
        bounds: bounds
    }, function(results, status) {
        if (status == "OK") {
            geocodeMap.setCenter(results[0].geometry.location);
            geocodeMap.setZoom(17);

            addressLat = results[0].geometry.location.lat();
            addressLong = results[0].geometry.location.lng();

            marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: geocodeMap
            });

            addressData = searchNearby(addressLat, addressLong);
            if (addressData == undefined || addressData.length == 0) {
                return;
            }

            dispatchData = searchTime(addressData);
            if (dispatchData === undefined) {
                return;
            }

            getDispatch(dispatchData);
        } else {
            $("#pred_output").html("No data found.");
        }
    });
}

/**
 * This function parses the csv file for nearby addresses.
 *
 * @param addressLat  The latitude of the inputted address.
 * @param addressLong The longitude of the inputted address.
 * @return            If it found results, an array containing information about nearby addresses.
 *                    If it didn't find results, an empty array.
 */
function searchNearby(addressLat, addressLong) {
    let addressData = [];
    let counter = 0;
    let latMi = 0.0144 / 2; // 0.5 mile of latitude
    let longMi = 0.0181 / 2; // 0.5 mile of longitude in San Francisco

    // searching for nearby addresses
    while (counter < 5) {
        for (i = 0; i < csvData.length; i++) {
            // checking if there is a call type, received timestamp, unit type, latitude, and longitude
            if (csvData[i][0].length > 0 && csvData[i][2].length > 0 && csvData[i][18].length > 0 &&
                csvData[i][22].length > 0 && csvData[i][23].length > 0) {
                // checks if the location is within a certain radius
                if ((csvData[i][22] < (addressLat + latMi)) && (csvData[i][22] > (addressLat - latMi))) {
                    if ((csvData[i][23] < (addressLong + longMi)) && (csvData[i][23] > (addressLong - longMi))) {
                        addressData.push(csvData[i]);
                    }
                }
            }
        }

        if (addressData.length > 0) { // if it found results
            return addressData;
        } else { // continue searching with an increased search radius
            latMi *= 2;
            longMi *= 2;
            counter++;
        }
    }

    if (counter >= 5) { // no results within 16 miles
        $("#pred_output").html("No data found for that location.");
        return addressData;
    }
}

/**
 * This function takes the data that has the nearby addresses, and further parses those for
 * the nearest times to whatever the user inputted.
 *
 * @param addressData An array holding the data of nearby addresses.
 * @return            An array holding the info of the locations nearest in time and address if successful.
 *                    If not successful, either returns nothing or an empty array.
 */
function searchTime(addressData) {
    let i = 0;
    let j = 0;
    let k = 0;
    let hour;
    let min;
    let timeOfDay;
    let time_input = $("#time_input").val();
    let temp = [];
    let time = [];
    let nearestTimes = [];

    if (addressData.length == 0) {
        return addressData;
    }

    time = time_input.split(/:| /);

    // checks to see if the user inputted a valid time in the correct format
    try {
        hour = parseInt(time[0]);
        min = parseInt(time[1]);
        timeOfDay = time[2].toUpperCase();

        if (((hour == 0 || hour == 00) && timeOfDay == "AM") ||
            ((hour > 0 && hour < 12) && timeOfDay == "PM")) {
            hour = 12 + hour;
        } else if (hour > 23 || hour < 0 || timeOfDay.length > 2 || (timeOfDay == "AM" && hour > 12) ||
            (timeOfDay == "PM" && hour == 0) || (timeOfDay != "AM" && timeOfDay != "PM") ||
            min > 59 || min < 0) { // invalid conditions
                $("#pred_output").html("Please give a valid time.");
                return;
        }
    } catch (e) {
        $("#pred_output").html("Please format the time as 00:00 AM/PM.");
        return;
    }

    // this loops through the data that contains all the nearby addresses
    // and pulls the data that is closest to the user's inputted time
    for (i = 0; i < addressData.length; i++) {
        time = addressData[i][2].split(" ");

        temp = [];
        temp = time[1].split(":");

        k = 0.5;
        while (k < 12.5) { // checks for the nearest times within a certain interval (initially within two hour range)
            if (temp[0] > hour - k && temp[0] < hour + k) {
                nearestTimes.push(addressData[i]);
            }

            if (nearestTimes.length > 0) { // if there were results
                break;
            } else { // increase time search interval
                k+= 0.5;
            }
        }
    }

    if (nearestTimes.length == 0) {
        $("#pred_output").html("No data found for the given time and address.");
    } else {
        return nearestTimes;
    }
}

/**
 * This function gets the most likely dispatch and medical emergency that would occur
 * given the array of nearby addresses and times and prints it out.
 * @param dispatchData An array containing the information of nearby addresses with the nearest times.
 * @return             Nothing if dispatchData has no data.
 */
function getDispatch(dispatchData) {
    let i = 0;
    let unitData = [];
    let callTypeData = [];
    let callCounter = 1;
    let unitCounter = 1;
    let temp1 = [];
    let temp2 = [];

    if (dispatchData.length == 0) {
        $("#pred_output").html("No data found for that time and location.");
        return;
    }

    // grabs and separates call type data and unit type data
    for (i = 0; i < dispatchData.length; i++) {
        callTypeData.push(dispatchData[i][0]);
        unitData.push(dispatchData[i][18]);
    }

    callTypeData.sort();
    unitData.sort();

    temp1 = [callTypeData[0], 1];
    temp2 = [unitData[0], 1];

    // finds the most frequent call type and unit type
    for (i = 1; i < callTypeData.length; i++) {
        if (callTypeData[i] == callTypeData[i - 1]) {
            callCounter++;
        } else {
            if (callCounter > temp1[1]) {
                temp1 = [];
                temp1.push(callTypeData[i - 1]);
                temp1.push(callCounter);
            }
            callCounter = 1;
        }

        if (unitData[i] == unitData[i - 1]) {
            unitCounter++;
        } else {
            if (unitCounter > temp2[1]) {
                temp2 = [];
                temp2.push(unitData[i - 1]);
                temp2.push(unitCounter);
            }
            unitCounter = 1;
        }
    }

    // converts the result to a more readable format
    temp1[0] = convert(temp1[0]);
    temp2[0] = convert(temp2[0]);

    $("#pred_output").html("The most likely dispatch sent for that time and location is " + temp2[0] + ", while" +
     " the most likely emergency in the area at that time would be " + temp1[0] + ".");
}

/**
 * This function simply converts the result of the most likely dispatch and
 * emergency to a more readable format (to lowercase and with proper grammar).
 *
 * @param string The result to convert.
 * @return       The result with proper grammar.
 */
function convert(string) {
    switch (string) {
        // unit types
        case "PRIVATE":
        case "SUPPORT":
            return "a " + string.toLowerCase() + " unit";
        case "ENGINE":
        case "TRUCK":
            return "a fire " + string.toLowerCase();
        case "RESCUE SQUAD":
        case "RESCUE CAPTAIN":
            return "a " + string.toLowerCase();
        case "CHIEF":
            return "a fire chief unit";
        case "INVESTIGATION":
            return "an investigation unit";
        case "MEDIC":
            return "a medical unit";
        //emergency types
        case "Alarms":
            return "an alarm";
        case "Citizen Assist / Service Call":
        case "Fuel Spill":
        case "Gas Leak (Natural and LP Gases)":
        case "Medical Incident":
        case "Smoke Investigation (Outside)":
        case "Structure Fire":
        case "Traffic Collision":
        case "Train / Rail Incident":
        case "Vehicle Fire":
            return "a " + string.toLowerCase();
        case "Elevator / Escalator Rescue":
        case "Electrical Hazard":
        case "Odor (Strange / Unknown)":
        case "Outside Fire":
            return "an " + string.toLowerCase();
        case "HazMat":
            return "a " + string + " incident";
        default:
            return string.toLowerCase();
    }
}
