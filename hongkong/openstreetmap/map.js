var hong_kong_center = [22.3693,114.1694];

var mymap = L.map('mapid').setView(hong_kong_center, 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  id: 'mapbox.streets'
}).addTo(mymap);

for(i = 0; i < AWS_Station.length; i++)
{
  L.marker([parseFloat(AWS_Station[i].latitude),parseFloat(AWS_Station[i].longitude)]).addTo(mymap)
  .bindPopup("<b>" + AWS_Station[i].StationName.name_UC + "</b><br />Weather Data Here.");
}
