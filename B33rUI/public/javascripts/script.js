var map;
var markerBares=[];

function initMap() {
    var oviedo_eii = new google.maps.LatLng(43.5314231,-5.703474);
    var misOpciones = {
      center: oviedo_eii,
      zoom: 13,
      mapTypeId: 'satellite',
      tilt: 45,
      heading: 90,
      streetViewControl: false,
      mapTypeControl: false,
      rotateControl:true,
      fullscreenControl:false
    };
    
  map = new google.maps.Map(document.getElementById("map"), misOpciones);
    
}

function readPoints(json){
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
    markerBares.push(marker);
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


$(document).ready(function(){
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