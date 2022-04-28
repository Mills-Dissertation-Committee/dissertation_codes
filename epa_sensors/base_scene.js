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
    zoom: 9,
    center: [-97.7, 30.2]
  });

  // ADD REGION 11 COUNTIES TO THE MAP.
  require(["esri/layers/GeoJSONLayer"], function(GeoJSONLayer){
    // points to the states layer in a service storing U.S. census data
    const geojsonlayer = new GeoJSONLayer({
      url: "geojson_files/region_11_counties.geojson"
    });

    map.add(geojsonlayer);  // adds the layer to the map
  });

  

});
