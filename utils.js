function average(data) {
    var sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += parseInt(data[i]);
    }
    return (sum / data.length).toFixed(2);
}


function calcTimeDiff(data) {
    var hourA = data[0].split(" ")[1].split(/:| /)[0];
    var minuteA = data[0].split(" ")[1].split(/:| /)[1];

    var hourB = data[1].split(" ")[1].split(/:| /)[0];
    var minuteB = data[1].split(" ")[1].split(/:| /)[1];

    if (hourA == hourB) {
        return minuteB - minuteA;
    } else {
        if (hourA > hourB) {
            hourA -= 12;
            hourB += 12;
            if (minuteA < minuteB) {
                return minuteB - minuteA + (hourB - hourA) * 60;
            }
        }
        minuteA = 60 - minuteA;
        hourA = hourB - hourA - 1;
        return minuteA + hourA * 60;
    }
}
