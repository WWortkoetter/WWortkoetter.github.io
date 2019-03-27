// Coded by Wyatt Wortkoetter
// 25 March 2019
"use strict";

window.onload = function () {

  mapboxgl.accessToken = 'pk.eyJ1Ijoid3dvcnRrb2V0dGVyIiwiYSI6ImNqdG9xZzNxNTBvNms0OXFwbWxjb3BkdmgifQ.Jl-yU48J6uvl7v8xKFVW4w';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/wwortkoetter/cj6zgn2fg1i3l2rptebgk0jrs',
    center: [0.000000, 0.000000],
    zoom: 0.0
  });

  var markerList = [];
  for (var i = 0; i < MLS_DB['features'].length; i++) {
    markerList.push(new mapboxgl.Marker().setLngLat(MLS_DB['features'][i]['geometry']['coordinates']));
    console.log("lööp");
  };
  console.log(markerList)
  for (var i = 0; i < markerList.length; i++){
    markerList[i].addTo(map);
  }
}
