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
    //    geocodeMap = new google.maps.Map(document.getElementById("map"), options);
    markerMap = new google.maps.Map(document.getElementById("map"), options);
    geocodeMap = new google.maps.Map(document.getElementById("geocode_map"), options);
    //    dispatchTimeHeatmap = new google.maps.Map(document.getElementById("map"), options);

    //    var heatData = getHeatmapData();

    // heatmap = new google.maps.visualization.HeatmapLayer();
    //
    //
    // heatmap.set('opacity', .3);
    // heatmap.set('dissipating', true);
    // heatmap.set('maxIntensity', 10);
    //
    // heatmap.setData(heatData);
    // heatmap.setMap(dispatchTimeHeatmap);
    // //console.log(heatmap.getData());

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
