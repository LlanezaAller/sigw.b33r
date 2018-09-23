var map;
var actualMarker;
var barMarkers = [];
var taxiMarkers = [];

var WMS_URL = 'http://ide.gijon.es/geoserver/gwc/service/wms?';
var WMS_Layers = 'Gijon%3ALU_Zona_Verde';
var TileWMS = function(coord, zoom) {
    var x = document.getElementById("wms_texto");
    var proj = map.getProjection();
    var zfactor = Math.pow(2, zoom);
    var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 450000 / zfactor, coord.y * 450000 / zfactor));
    var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 450000 / zfactor, (coord.y + 1) * 450000 / zfactor));
    var bbox = top.lng() + "," + bot.lat() + "," + bot.lng() + "," + top.lat();

    var myURL = WMS_URL + "TRANSPARENT=true&SRS=EPSG%3A25830&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&FORMAT=image%2Fpng&WIDTH=200&HEIGHT=200";
    myURL += "&LAYERS=" + WMS_Layers;
    myURL += "&BBOX=" + bbox;
    x.innerHTML = myURL;
    console.log(myURL);
    return myURL;
}


function initMap() {
    var centro = new google.maps.LatLng(43.528047, -5.668113);
    var misOpciones = {
        center: centro,
        zoom: 14,
        mapTypeId: 'satellite',
        tilt: 45,
        heading: 90,
        streetViewControl: false,
        mapTypeControl: false,
        rotateControl: true,
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), misOpciones);
    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });

    var overlayOptions = {
        getTileUrl: TileWMS,
        tileSize: new google.maps.Size(200, 200)
    };
    var overlayWMS = new google.maps.ImageMapType(overlayOptions);
    map.overlayMapTypes.push(overlayWMS);

}

//read points functions

function readTaxiPoints(json) {
    cleanTaxiMarkers();
    var jsonParse = JSON.parse(json);
    var taxiObjects = jsonParse["taxis"];
    for (let index in taxiObjects) {
        var taxi = taxiObjects[index];
        var fields = taxi["fields"];
        var latitud = fields["latitud"];
        var longitud = fields["longitud"];
        var parada = fields["parada"];
        var location = new google.maps.LatLng(latitud, longitud);

        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        var infoView = '<div id="content">' +
            '<div id="taxiInfo">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">' + parada + '</h1>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: infoView
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        this.taxiMarkers.push(marker);
    }
}

function readPoints(json) {
    var jsonObj = JSON.parse(json);
    for (let i in json) {
        var lat = 0;
        var lon = 0;
        for (let j in json[i]) {
            if (json[i][j].hasOwnProperty('latitude')) {
                lat = json[i][j];
            } else if (json[i][j].hasOwnProperty('longitude')) {
                lon = json[i][j];
            }
            if (lat != 0 && lon != 0)
                addMarker(new google.maps.LatLng(lat, lon));
        }
    }
}

function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    if (this.actualMarker !== undefined)
        this.actualMarker.setMap(null);
    this.actualMarker = marker;
}

//// clean functions

function cleanBarMarkers() {
    for (var i = 0; i < this.barMarkers.length; i++) {
        this.barMarkers[i].setMap(null);
    }
    this.barMarkers = [];
}

function cleanTaxiMarkers() {
    for (var i = 0; i < this.taxiMarkers.length; i++) {
        this.taxiMarkers[i].setMap(null);
    }
    this.taxiMarkers = [];
}

function cleanMap() {
    cleanBarMarkers();
    cleanTaxiMarkers();
}

$(document).ready(function() {
    $('#slider').slider();
});