var geocoder;
var markerMap;
var geocodeMap;
var dispatchTimeHeatmap;
var heatmap;
var markerCluster = [];
var locations = [];
var markers = [];

/* This function initializes all the maps on the page from the google maps API,
 * including the geocoding map and the general map of San Francisco.
 */
function initialize() {
    geocoder = new google.maps.Geocoder();
    var options = {
        center: new google.maps.LatLng(37.7749, -122.4194),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP // change the style and colors of map to fit theme of site
    };

    var heatmapOptions = {
        center: new google.maps.LatLng(37.765, -122.44),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    markerMap = new google.maps.Map(document.getElementById("map"), options);
    geocodeMap = new google.maps.Map(document.getElementById("geocode_map"), options);
    dispatchTimeHeatmap = new google.maps.Map(document.getElementById("avg_dispatch_heatmap"), heatmapOptions);

    heatmap = new google.maps.visualization.HeatmapLayer();

    heatmap.set('opacity', .3);
    heatmap.set('dissipating', true);
    heatmap.set('maxIntensity', 10);

    for (var i = 0; i < 18; i++) {
        markerCluster[i] = new MarkerClusterer(markerMap, markers, {
            imagePath: "./images/m"
        });
    }

    let bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(37.6, -122.6),
                new google.maps.LatLng(37.9, -122.3));

    var input = document.getElementById("address_input");
    var options = {
        bounds: bounds,
        types: ["address"]
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);
}

function updateMap() {
    var heatData = getHeatmapData();
    heatmap.setData(heatData);
    heatmap.setMap(dispatchTimeHeatmap);
}

/* This function places markers at the location of the incidents
 * on a map.
 */
function mapData(type, index) {
    locations = [];
    markers = [];
    data = [];
    markerCluster[index].clearMarkers();

    data = getCategoryData(csvData, type);

    for (var i = 0; i < data.length; i++) {
        locations.push(new google.maps.LatLng(data[i][0], data[i][1]));
    }

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
        });
    });

    markerCluster[index] = new MarkerClusterer(markerMap, markers, {
        imagePath: "./images/m"
    });
}

function getHeatmapData() {
    var heatmapData = [];
    var dataPoints = [];

    let temp = [];
    let temp1 = [];

        //loop1:
        for (let i = 0; i < csvData.length - 1; i++) {
            temp = [];
            temp1 = [];
            if (csvData[i][3].length > 0 && csvData[i][5].length > 0 && csvData[i][21].length > 0 &&
                csvData[i][22].length > 0 && csvData[i][23].length > 0) {

                // loop2:
                // for (let j = 0; j < heatmapData.length; j++) {
                //     if (heatmapData[j][1].includes(csvData[i][22]) && heatmapData[j][2].includes(csvData[i][23])) {
                //         continue loop1;
                //     }
                // }

                temp1.push(csvData[i][3]);
                temp1.push(csvData[i][5]);
                temp.push(temp1);
                temp.push(csvData[i][22]);
                temp.push(csvData[i][23]);
                heatmapData.push(temp);
            }
        }

    temp = [];
    for (let i = 0; i < heatmapData.length; i++) {
        temp.push(calcTimeDiff(heatmapData[i][0]));
        if (temp[0] > 500) {
            heatmapData[i][0] = 0;
            temp = [];
            continue;
        } else {
            heatmapData[i][0] = temp[0];
            temp = [];
        }
    }



    for (var i = 0; i < heatmapData.length; i++) {
        dataPoints.push({
            location: new google.maps.LatLng(parseFloat(heatmapData[i][1]), parseFloat(heatmapData[i][2]))
            // the weight is based on the average dispatch time of 6 minutes (rounded down)
            // weight: (((1 / 6) * parseFloat(heatmapData[i][0])) + 1)
        });
    }
    return (dataPoints);
}
