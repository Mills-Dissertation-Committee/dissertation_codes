require(["esri/Map",
          "esri/views/SceneView",
          "esri/layers/Layer"], (
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

    geojsonlayer.opacity = 0.25;

    map.add(geojsonlayer);  // adds the layer to the map
  });

  // ADD EPA SENSORS TO THE MAP.
  require([
      "esri/layers/FeatureLayer",
      "esri/geometry/Point"
    ], function(FeatureLayer, Point) {
      loadScript('readCSV.js', function() {                 // This script reads the Point-Source Emissions CSV.
        /**************************************************
         * Create graphics with textarea data
         **************************************************/
          // raw CSV data from textarea.
          Data = PlottingEPA.value.split('\n');

          // +2 to skip the header and the empty line at the bottom.
          while(Data.length > (i + 2))
          {
              Line = Data[i+1].split(",");

              epaName[i] = Line[0];
              epaLatitude[i] = Line[1];
              epaLongitude[i] = Line[2];
              epaScale[i] = Line[3];
              epaScaleDef[i] = Line[4];
              epaMonitorObj[i] = Line[5];

              epaPoint[i] =
              {
              geometry: new Point({
                x: epaLongitude[i],
                y: epaLatitude[i],
                spatialReference: 4326
              }),
              // select only the attributes you care about
              attributes: {
                epaName: epaName[i],
                ObjectID: parseInt(i),
                epaScale: epaScale[i],
                epaScaleDef: epaScaleDef[i],
                epaMonitorObj: epaMonitorObj[i]
              }
            };
            i++;
          }
          if(Data.length = (i + 2))
          {
            /**************************************************
             * Create a FeatureLayer with the Point-Source Array
             **************************************************/
            epaLayer = new FeatureLayer({
              source: epaPoint, // autocast as an array of esri/Graphic
              // create an instance of esri/layers/support/Field for each field object
              fields: epaFields, // This is required when creating a layer from Graphics
              objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
              renderer: epaRenderer, // set the visualization on the layer
              popupTemplate: epaTemplate
            });

            map.add(epaLayer);
          }
        });
  });

});
