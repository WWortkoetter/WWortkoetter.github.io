// Coded by Wyatt Wortkoetter
"use strict";

window.onload = function () {
  function personalFilter(feature, layer) {
  }

  var myFunctionHolder = {};

  myFunctionHolder.addPopups = function (feature, layer) {
  }

  myFunctionHolder.pointToCircle = function(feature, layer) {
    var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "greenyellow",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: .8
    };
    var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
    circleMarker.on('click', function () {

    })
    return circleMarker;
  }

  var mapObject = L.map('mapDivId').setView([39.961, -82.89], 11);
  //https://api.mapbox.com/styles/v1/wwortkoetter/cj6zgn2fg1i3l2rptebgk0jrs.html?fresh=true&title=true&access_token=pk.eyJ1Ijoid3dvcnRrb2V0dGVyIiwiYSI6ImNqdG9xZzNxNTBvNms0OXFwbWxjb3BkdmgifQ.Jl-yU48J6uvl7v8xKFVW4w#0.0/0.000000/0.000000/0
  //https://api.mapbox.com/styles/v1/erkraus/cjahqt4zb97sk2spesjpgheb1/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXJrcmF1cyIsImEiOiJjajlxYm1hMDM2MG45MnFzNDU3dzgzcmVzIn0.xr26eepd9OU-2qebI9xWrw
  var baseMap = L.tileLayer('mapbox://styles/wwortkoetter/cj6zgn2fg1i3l2rptebgk0jrs', {
    maxZoom: 18,
    attribution: "&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; Data from <a href='https://www.google.com/'>EXAMPLE</a>"
  }).addTo(mapObject);

  var stadiumsLayerGroup = L.geoJSON(stadiums, {
    onEachFeature: myFunctionHolder.addPopups,
    pointToLayer: myFunctionHolder.pointToCircle,
    filter: personalFilter
  });

  // var stadiumsLayerGroup = L.geoJSON(stadiums);
}
