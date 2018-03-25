/**
 * This file contains helper methods and other small functions used in the other files.
 */

let slideNum = 1; // used in showing the slides in the Average Dispatch Data tab

/**
 * This function changes the slide to the next one.
 *
 * @param n The direction to move the slide (left or right, -1 or 1 respectively).
 */
function incSlideNum(n) {
    showSlide(slideNum += n);
}

/**
 * This function displays the current slide.
 *
 * @param n The slide to show.
 */
function showSlide(n) {
    let i;
    let slideContent = $(".slide_content");

    if (n > slideContent.length) {
        slideNum = 1;
    }
    if (n < 1) {
        slideNum = slideContent.length;
    }

    slideContent.each(function() {
        $(this).css({"display": "none"});
    });

    slideContent.eq(slideNum - 1).css({"display": "block"});
}

/**
 * This function takes in an array and gives the average of all values inside it.
 *
 * @param data An array containing the values to be averaged.
 * @return     The average of all the values inside the array passed in, truncated to
 *             2 decimal places.
 */
function average(data) {
    let i = 0;
    let sum = 0;

    for (i = 0; i < data.length; i++) {
        sum += parseInt(data[i]);
    }

    return (sum / data.length).toFixed(2);
}

/**
 * This function calculates the difference between 2 times in minutes. It takes in
 * an array with two values: the initial time and the final time.
 *
 * @return The time difference in minutes.
 */
function calcTimeDiff(data) {
    // the relevant info is parsed from the time
    let hourA = data[0].split(" ")[1].split(/:| /)[0];
    let minuteA = data[0].split(" ")[1].split(/:| /)[1];

    let hourB = data[1].split(" ")[1].split(/:| /)[0];
    let minuteB = data[1].split(" ")[1].split(/:| /)[1];

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

/**
 * This function shows the tab clicked on.
 *
 * @param id The id of the tab to be shown.
 */
function showTab(id) {
    $(".tab_content").each(function() {
        $(this).css({"display": "none"});
    });

    $("#" + id).css({"display": "block"});
}

/**
 * This function updates a chart with a new dataset.
 *
 * @param chart The chart to be updated.
 * @param data  The new data to be displayed on the chart.
 */
function updateChart(chart, data) {
    chart.data.datasets[0].data = data;
    chart.update();
}

/**
 * This function updates the button above the chart displaying
 * incident times with the incident chosen.
 *
 * @param id The id of the incident selected from the dropdown menu.
 */
function updateButton(id) {
    $("#inc_times_drp_btn").html($("#" + id).html());
}
