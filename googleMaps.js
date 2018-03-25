let geocoder;
let markerMap;
let geocodeMap;
let incidentHeatmap;
let heatmapLayer;
let markers = [];
let markerCluster = [];

/**
 * This function initializes all the maps on the page using the Google Maps API,
 * including the geocoding map, marker map, and heatmap.
 */
function initialize() {
    let i = 0;
    let mapOptions = {
        center: new google.maps.LatLng(37.7749, -122.4194),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let heatmapOptions = {
        center: new google.maps.LatLng(37.765, -122.44),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    let bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(37.6, -122.6),
        new google.maps.LatLng(37.9, -122.3));

    // for the autocomplete in the Emergency Prediction tab
    let input = $("#address_input")[0];
    let autocompleteOptions = {
        bounds: bounds,
        types: ["address"]
    };

    let autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);

    geocoder = new google.maps.Geocoder();
    heatmapLayer = new google.maps.visualization.HeatmapLayer();
    markerMap = new google.maps.Map($("#marker_map")[0], mapOptions);
    geocodeMap = new google.maps.Map($("#geocode_map")[0], mapOptions);
    incidentHeatmap = new google.maps.Map($("#avg_dispatch_heatmap")[0], heatmapOptions);

    heatmapLayer.set("opacity", .3);
    heatmapLayer.set("dissipating", true);
    heatmapLayer.set("maxIntensity", 10);

    for (i = 0; i < 18; i++) {
        markerCluster[i] = new MarkerClusterer(markerMap, markers, {
            imagePath: "images/m"
        });
    }
}

/**
 * This function updates the heatmap to display the data from the csv file.
 */
function updateHeatmap() {
    let heatData = getHeatmapData();
    heatmapLayer.setData(heatData);
    heatmapLayer.setMap(incidentHeatmap);
}

/**
 * This function places markers at the location of the incidents on the marker map.
 */
function mapData(type, index) {
    let i = 0;
    let locations = [];
    let data = [];

    markerCluster[index].clearMarkers();

    data = getCategoryData(type);

    for (i = 0; i < data.length; i++) {
        locations.push(new google.maps.LatLng(data[i][0], data[i][1]));
    }

    markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
        });
    });

    markerCluster[index] = new MarkerClusterer(markerMap, markers, {
        imagePath: "images/m"
    });
}

/**
 * This function shows / hides markers on the map.
 *
 * @param type  The incident type of the locations to be shown.
 * @param index The index in the array of markers that is to be cleared / added to.
 * @param id    The HTML id of the checkbox.
 */
function showMarkers(type, index, id) {
    if ($("#" + id).is(":checked")) {
        mapData(type, index);
    }
    else {
        markerCluster[index].clearMarkers();
    }
}

/**
 * This function gets the latitude and longitude of all incidents and
 * converts them into LatLng objects for the heatmap.
 *
 * @return Array of LatLngs containing the location of all incidents.
 */
function getHeatmapData() {
    let heatmapData = [];
    let dataPoints = [];
    let temp = [];
    let i = 0;

    for (i = 0; i < csvData.length - 1; i++) {
        temp = [];
        if (csvData[i][22].length > 0 && csvData[i][23].length > 0) {
            temp.push(csvData[i][22]);
            temp.push(csvData[i][23]);
            heatmapData.push(temp);
        }
    }

    for (i = 0; i < heatmapData.length; i++) {
        dataPoints.push({
            location: new google.maps.LatLng(parseFloat(heatmapData[i][0]),
                parseFloat(heatmapData[i][1]))
        });
    }
    return (dataPoints);
}
