function sortByZipcode(data) {
    var zipcodeData = [];
    var sum = [];

    for (let i = 0; i < 27; i++) {
        zipcodeData[i] = 0;
        sum[i] = 0;
    }

    for (let i = 0; i < data.length; i++) {
        switch (data[i][1]) {
            case "94102":
                zipcodeData[0] += data[i][0];
                sum[0]++;
                break;
            case "94103":
                zipcodeData[1] += data[i][0];
                sum[1]++;
                break;
            case "94104":
                zipcodeData[2] += data[i][0];
                sum[2]++;
                break;
            case "94105":
                zipcodeData[3] += data[i][0];
                sum[3]++;
                break;
            case "94107":
                zipcodeData[4] += data[i][0];
                sum[4]++;
                break;
            case "94108":
                zipcodeData[5] += data[i][0];
                sum[5]++;
                break;
            case "94109":
                zipcodeData[6] += data[i][0];
                sum[6]++;
                break;
            case "94110":
                zipcodeData[7] += data[i][0];
                sum[7]++;
                break;
            case "94111":
                zipcodeData[8] += data[i][0];
                sum[8]++;
                break;
            case "94112":
                zipcodeData[9] += data[i][0];
                sum[9]++;
                break;
            case "94114":
                zipcodeData[10] += data[i][0];
                sum[10]++;
                break;
            case "94115":
                zipcodeData[11] += data[i][0];
                sum[11]++;
                break;
            case "94116":
                zipcodeData[12] += data[i][0];
                sum[12]++;
                break;
            case "94117":
                zipcodeData[13] += data[i][0];
                sum[13]++;
                break;
            case "94118":
                zipcodeData[14] += data[i][0];
                sum[14]++;
                break;
            case "94121":
                zipcodeData[15] += data[i][0];
                sum[15]++;
                break;
            case "94122":
                zipcodeData[16] += data[i][0];
                sum[16]++;
                break;
            case "94123":
                zipcodeData[17] += data[i][0];
                sum[17]++;
                break;
            case "94124":
                zipcodeData[18] += data[i][0];
                sum[18]++;
                break;
            case "94127":
                zipcodeData[19] += data[i][0];
                sum[19]++;
                break;
            case "94129":
                zipcodeData[20] += data[i][0];
                sum[20]++;
                break;
            case "94130":
                zipcodeData[21] += data[i][0];
                sum[21]++;
                break;
            case "94131":
                zipcodeData[22] += data[i][0];
                sum[22]++;
                break;
            case "94132":
                zipcodeData[23] += data[i][0];
                sum[23]++;
                break;
            case "94133":
                zipcodeData[24] += data[i][0];
                sum[24]++;
                break;
            case "94134":
                zipcodeData[25] += data[i][0];
                sum[25]++;
                break;
            case "94158":
                zipcodeData[26] += data[i][0];
                sum[26]++;
                break;
        }
    }

    for (let i = 0; i < zipcodeData.length; i++) {
        zipcodeData[i] = zipcodeData[i] / sum[i];
    }

    return zipcodeData;
}
