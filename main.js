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

  //var point = new Point(-84.516,39.131)
  // var ll1 = new mapboxgl.LngLat(-84.516,39.131);
  // var ll2 = new mapboxgl.LngLat(-82.991111,40.009444);

  // var marker1 = new mapboxgl.Marker()
  // .setLngLat([-84.516,39.131])
  // .addTo(map);
  // var marker2 = new mapboxgl.Marker()
  // .setLngLat([-82.991111,40.009444])
  // .addTo(map);
  // var marker3 = new mapboxgl.Marker()
  // .setLngLat([-84.401,33.755])
  // .addTo(map);

  var markerList = [];
  for (var i = 0; i < teams['features'].length; i++) {
    markerList.push(new mapboxgl.Marker().setLngLat(teams['features'][i]['geometry']['coordinates']));
    console.log("lööp");
  };
  console.log(markerList)
  markerList.addTo(map);
}
