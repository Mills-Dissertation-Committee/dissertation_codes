require(["esri/Map", "esri/views/SceneView", "esri/layers/Layer"], (
  Map,
  SceneView,
  Layer
) => {
  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new SceneView({
    map: map,
    container: "viewDiv",
    zoom: 7,
    center: [-87, 34]
  });

  require(["esri/layers/GeoJSONLayer"], function(GeoJSONLayer){
    // points to the states layer in a service storing U.S. census data
    const geojsonlayer = new GeoJSONLayer({
      url: "geojson_files/region_11_counties.json"
    });
    
    map.add(geojsonlayer);  // adds the layer to the map
  });

});
