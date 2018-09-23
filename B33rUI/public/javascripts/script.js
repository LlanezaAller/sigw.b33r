var map;
var actualMarker;
var barMarkers = [];
var taxiMarkers = [];

function initMap() {
    var oviedo_eii = new google.maps.LatLng(43.354810, -5.851805);
    var misOpciones = {
        center: oviedo_eii,
        zoom: 18,
        mapTypeId: 'satellite',
        tilt: 45,
        heading: 90,
        streetViewControl: false,
        mapTypeControl: false,
        rotateControl: true,
        fullscreenControl: false
    };

    map = new google.maps.Map(document.getElementById("map"), misOpciones);
    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });

}

//read points functions

function readTaxiPoints(json) {
    cleanTaxiMarkers();

    var taxiObjects = JSON.parse(json);
    for (let taxi in taxiObjects) {
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