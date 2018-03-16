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
    var input = document.getElementById('address_input').value;
    var latBound1 = 37.6065538;



    // gets the latitude and longitude from the inputted address
    geocoder.geocode({
        address: input
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
            dispatchData = searchTime(addressData);
            getDispatch(dispatchData);

        } else {
            alert("The Geocode was not successful for the following reason: " + status);
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
        alert("No data found for that location.");
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
        } else if (hour > 23 || hour < 0) {
            alert("Please give a valid time.");
            return;
        } else if (timeOfDay.length > 2) {
            alert("Please give a valid time.");
            return;
        }
    } catch (e) {
        alert("Please format the time as 00:00 AM/PM.");
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
        alert("No data found for the given time and address.");
    } else {
        return nearestTimes;
    }
}

function getDispatch(dispatchData) {
    if (dispatchData.length == 0) {
        alert("No data found for that time and location.");
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

    //FIXME change to a printout
    alert("The most likely emergency was " + temp1[0] + " and the unit most sent to that area is " + temp2[0]);
}
