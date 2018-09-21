var map;

function initMap() {
    var oviedo_eii = new google.maps.LatLng(43.354810,-5.851805);
    var misOpciones = {
      center: oviedo_eii,
      zoom: 18,
      mapTypeId: 'satellite',
      tilt: 45,
      heading: 90,
      streetViewControl: false,
      mapTypeControl: false,
      rotateControl:true,
      fullscreenControl:false
    };
    
  map = new google.maps.Map(document.getElementById("map"), misOpciones);
    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });
    
}