require([
    "esri/views/MapView",
    "esri/Map",
    "esri/request",
    "esri/geometry/geometryEngine",
    "esri/geometry/SpatialReference",
    "esri/layers/FeatureLayer",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/widgets/Legend",
    "esri/renderers/ClassBreaksRenderer",
    "esri/rest/support/Query"
  ], function(MapView, Map, SceneView, Layer, esriRequest, geometryEngine, SpatialReference, FeatureLayer, Point, Polygon,
    Legend, ClassBreaksRenderer, Query) {
              const map = new Map({
                basemap: "gray-vector"
              });

              const view = new SceneView({
                map: map,
                container: "viewDiv",
                zoom: 7,
                center: [-87, 34]
              });
              
              loadScript('region_11_counties.js', function() {      // Esri Region 11 counties.
                loadScript('pointsourceFeatures.js', function() {   // Esri map requirements map/mapview, and other scripts.
                })
              })

            });
