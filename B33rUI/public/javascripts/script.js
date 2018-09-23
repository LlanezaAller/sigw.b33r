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
    var jsonObj=json;
    $.each(jsonObj.bares, function(i, bar) {
        var lat=bar.location.latitude;
        var lon=bar.location.longitude;
        addMarkerBar(new google.maps.LatLng(lat,lon),bar.name,bar.imageUrl,bar.guid);
    });
}

function addMarkerBar(location,name,image,guid) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    var infoView = '<div id="content">' +
    '<div id="barInfo">' +
    '</div>' +
    '<img src="'+image+'" />'+
    '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
    '<form>'+
    '<span id="actualguid" hidden>'+guid+'</span>'+
    '<fieldset class="starability-basic"> '+
    '<legend>Vota tu experiencia en este bar:</legend>'+
  
      '<input type="radio" id="rate5" name="rating" value="5" />'+
      '<label for="rate5" title="Amazing" id="five-points">5</label>'+
      '<input type="radio" id="rate4" name="rating" value="4" />'+
      '<label for="rate4" title="Very good" id="four-points">4</label>'+
      '<input type="radio" id="rate3" name="rating" value="3" />'+
      '<label for="rate3" title="Average" id="three-points">3</label>'+
      '<input type="radio" id="rate2" name="rating" value="2" />'+
      '<label for="rate2" title="Not good" id="two-points">2</label>'+
      '<input type="radio" id="rate1" name="rating" value="1" />'+
      '<label for="rate1" title="Terrible" id="one-points">1</label>'+
    '</fieldset>'+
    '<textarea id="mensajeValoracion"></textarea>'+
    '</form>'+
    '<button onclick="enviarValoracion()">Enviar valoración</button>'+
    '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: infoView
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
        
        document.getElementById("five-points").addEventListener("click", function() {
            $("#five-points").addClass("selectedValoracion");
        }, false);
        document.getElementById("four-points").addEventListener("click", function() {
            $("#four-points").addClass("selectedValoracion");
        }, false);
        document.getElementById("three-points").addEventListener("click", function() {
            $("#three-points").addClass("selectedValoracion");
        }, false);
        document.getElementById("two-points").addEventListener("click", function() {
            $("#two-points").addClass("selectedValoracion");
        }, false);
        document.getElementById("one-points").addEventListener("click", function() {
            $("#one-points").addClass("selectedValoracion");
        }, false);
    });
    barMarkers.push(marker);
}

function enviarValoracion(){
    var mensaje=$("#mensajeValoracion").val();  
    var voto=parseInt($(".selectedValoracion").text());
    var guid= $("#actualguid").text();
    item = {}
    item ["Msg"] = mensaje;
    item ["Value"] = voto;
    jsonString = JSON.stringify(item);

    $.ajax({
        url : '/api/pub/'+guid,
        data : jsonString,
        type : 'POST',
        dataType : 'json',
        success : function(json) {
            alert("votado")
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete : function(xhr, status) {
            alert('Votado');
        }
    });  
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
    readPoints(points);
});



var points={"bares":[{
	"guid":"1",
	"name":"La casa del cafe",
	"location":{
		"latitude":43.5392814,
		"longitude":-5.6675749
	},
	"imageUrl":"https://lh5.googleusercontent.com/p/AF1QipNqnuN4cLpu_eSgTP-vQCm_eWkBcAu2oMreNV6y=w408-h272-k-no",
	"votes":[{
		"value":4,
		"msg":"Mensaje"
	}]
},
{
	"guid":"2",
	"name":"Blu café",
	"location":{
		"latitude":43.5415915,
		"longitude":-5.6688648
	},
	"imageUrl":"https://lh5.googleusercontent.com/p/AF1QipMNRDDHds7EICM7jx5gcSVoON5QbLr2QMMmguhb=w408-h272-k-no",
	"votes":[{
		"value":4,
		"msg":"Mensaje"
	}]
}]}