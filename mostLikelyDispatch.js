/**
 * This file contains all the functions related to finding the
 * most likely dispatch given an address and time.
 */

//FIXME maybe pass in csvData instead?

/* This function takes the inputted address, finds its latitude and longitude,
 * and uses that to locate nearby addresses from the data set.
 */
function findAddress() {
    var addressData = [];
    var dispatchData = [];
    var adInput = document.getElementById('address_input').value;
    let bounds = new google.maps.LatLngBounds(
                    new google.maps.LatLng(37.6, -122.6),
                    new google.maps.LatLng(37.9, -122.3));

    if (adInput == 0 || document.getElementById("time_input").value == 0) {
        document.getElementById('pred_output').innerHTML = "Please enter information into the fields.";
        return;
    }


    // gets the latitude and longitude from the inputted address
    geocoder.geocode({
        address: adInput,
        bounds: bounds
    }, function(results, status) {
        if (status == 'OK') {
            geocodeMap.setCenter(results[0].geometry.location);
            geocodeMap.setZoom(17);

            addressLat = results[0].geometry.location.lat();
            addressLong = results[0].geometry.location.lng();

            //FIXME get rid of old marker
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
            document.getElementById("pred_output").innerHTML = "The Geocode was not successful for the following reason: " + status;
        }
    });
}

function searchNearby(addressLat, addressLong) {
    var addressData = [];
    var counter = 0;
    var latMi = 0.0144; // 1 mile of latitude
    var longMi = 0.0181; // 1 mile of longitude in San Francisco

    // searching for nearby addresses
    while (counter < 5) {
        for (var i = 0; i < csvData.length; i++) {
            // checking if there is a latitude, longitude, time, and dispatch type
            if (csvData[i][0].length > 0 && csvData[i][2].length > 0 && csvData[i][18].length > 0 &&
                csvData[i][22].length > 0 && csvData[i][23].length > 0) {
                if ((csvData[i][22] < (addressLat + latMi)) && (csvData[i][22] > (addressLat - latMi))) {
                    if ((csvData[i][23] < (addressLong + longMi)) && (csvData[i][23] > (addressLong - longMi))) {
                        addressData.push(csvData[i]);
                    }
                }
            }
        }

        if (addressData.length > 0) {
            return addressData;
        } else {
            latMi *= 2;
            longMi *= 2;
            counter++;
        }
    }

    if (counter >= 5) {
        //FIXME change to a printout instead of alert
        document.getElementById("pred_output").innerHTML = "No data found for that location.";
        return addressData;
    }
}


/* This function is called when the user requests the most likely
 *  dispatch given an address and time. This function returns an
 *  array that contains the data with the nearest locations
 *  and closest times.
 */
function searchTime(addressData) {
    // user input of a time
    var time_input = document.getElementById("time_input").value;

    // these hold the hour, minute, and AM/PM of the user input
    var hour;
    var min;
    var timeOfDay;

    if (addressData.length == 0) {
        return addressData;
    }

    // use REGEX to split on whitespace and colon
    var time = time_input.split(/:| /);

    // checks to see if the user inputted a valid time in the correct format
    try {
        hour = parseInt(time[0]);
        min = parseInt(time[1]);
        timeOfDay = time[2].toUpperCase();

        if (((hour == 0 || hour == 00) && timeOfDay == "AM") ||
            (hour < 12 && timeOfDay == "PM")) {
            hour = 12 + hour;
        } else if (hour > 23 || hour < 0 || timeOfDay.length > 2 || (timeOfDay == "AM" && hour > 12)) {
            document.getElementById("pred_output").innerHTML = "Please give a valid time.";
            return;
        }
    } catch (e) {
        document.getElementById("pred_output").innerHTML = "Please format the time as 00:00 AM/PM.";
        return;
    }

    var temp = [];
    var nearestTimes = [];

    // this loops through the data that contains all the nearby addresses
    // and pulls the data that is closest to the user's inputted time
    for (var i = 0; i < addressData.length; i++) {
        time = addressData[i][2].split(" ");

        // temp contains the hour, minute, and seconds of a nearby address' data
        temp = [];
        temp = time[1].split(":");

        // hour and minute increments
        var k = 1;

        // this checks for the nearest times within a two, then four hour range of the inputted time
        while (k < 3) {
            if (temp[0] > hour - k && temp[0] < hour + k) {
                nearestTimes.push(addressData[i]);
            }


            // if there were no times within a two hour range of the user's time,
            // increase it to a four hour range
            if (nearestTimes.length > 0) {
                break;
            } else {
                k += 1;
            }
        }
    }

    //FIXME change to printout
    if (nearestTimes.length == 0) {
        document.getElementById("pred_output").innerHTML = "No data found for the given time and address.";
    } else {
        return nearestTimes;
    }
}

function getDispatch(dispatchData) {
    if (dispatchData.length == 0) {
        document.getElementById("pred_output").innerHTML = "No data found for that time and location.";
        return;
    }

    // grabs and separates call type data and unit type data
    var unitData = [];
    var callTypeData = [];
    for (var i = 0; i < dispatchData.length; i++) {
        callTypeData.push(dispatchData[i][0]);
        unitData.push(dispatchData[i][18]);
    }

    callTypeData.sort();
    unitData.sort();

    var callCounter = 1;
    var unitCounter = 1;

    var temp1 = [callTypeData[0], 1];
    var temp2 = [unitData[0], 1];

    // finds the most frequent call type and unit type
    for (var i = 1; i < callTypeData.length; i++) {
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

    temp1[0] = convert(temp1[0]);
    temp2[0] = convert(temp2[0]);

    //FIXME change to a printout
    document.getElementById("pred_output").innerHTML = "The most likely dispatch sent for that time and location is " + temp2[0] + ", while" +
     " the most likely emergency in the area at that time would be " + temp1[0] + ".";
}

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
