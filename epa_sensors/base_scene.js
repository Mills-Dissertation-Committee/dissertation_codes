require(["esri/Map", "esri/views/SceneView", "esri/layers/Layer", "esri/layers/GraphicsLayer", "esri/Graphic"], (
  Map,
  SceneView,
  Layer,
  GraphicsLayer,
  Graphic
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

  /************************************************
   *
   * Create a layer from a GEOjson layer.
   *
   *
   *************************************************/

   const counties_renderer = {
     type: "simple-fill",
     color: [227, 139, 79, 0.8], // Orange, opacity 80%
     outline: {
       color: [255, 255, 255],
       width: 1
     }
   };

   require(["esri/layers/GeoJSONLayer"], function(GeoJSONLayer){
   // points to the states layer in a service storing U.S. census data
   const geojsonlayer = new GeoJSONLayer({
     url: "geojson_files/region_11_counties.geojson",
   });

   const fillSymbol = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [227, 139, 79, 0.8],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 2
      }
    };

    const polygonGraphic = new Graphic({
      geometry: geojsonlayer,
      symbol: fillSymbol
    });

    graphicsLayer.add(polygonGraphic);

   //map.add(geojsonlayer);  // adds the layer to the map
 });

});
