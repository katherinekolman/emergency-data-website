

function sortByZipcode(data) {
    var zipcodeData = [];

    for (let i = 0; i < 27; i++) {
        zipcodeData[i] = [];
    }

    for (let i = 0; i < data.length; i++) {
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

    for (let i= 0; i < zipcodeData.length; i++) {
        zipcodeData[i] = average(zipcodeData[i]);
    }

    return zipcodeData;
}
