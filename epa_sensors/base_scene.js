require(["esri/Map",
          "esri/views/SceneView",
          "esri/widgets/Legend",
          "esri/layers/Layer"], (
  Map,
  SceneView,
  Legend,
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
  require(["esri/layers/GeoJSONLayer",
            "esri/renderers/SimpleRenderer",
            "esri/symbols/SimpleFillSymbol"], function(
    GeoJSONLayer,
    SimpleRenderer,
    SimpleFillSymbol){
    // points to the states layer in a service storing U.S. census data
    const geojsonlayer = new GeoJSONLayer({
      url: "geojson_files/region_11_counties.geojson"
    });

    geojsonlayer.opacity = 0.25;

    geojsonlayer.renderer = new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: "darkgreen",
          outline: {
            color: "black",
            width: "2px"
          }
        })
      });

    map.add(geojsonlayer);  // adds the layer to the map

    // Create a variable referencing the checkbox node
      const region11LayerToggle = document.getElementById("region11Layer");

      // Listen to the change event for the checkbox
      region11LayerToggle.addEventListener("change", () => {
        // When the checkbox is checked (true), set the layer's visibility to true
        geojsonlayer.visible = region11LayerToggle.checked;
      });

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
              popupTemplate: epaTemplate,
              labelingInfo: [epaLabelClass]
            });

            map.add(epaLayer);
          }

        });
        // Create a variable referencing the checkbox node
          const epaLayerToggle = document.getElementById("epaLayer");

          // Listen to the change event for the checkbox
          epaLayerToggle.addEventListener("change", () => {
            // When the checkbox is checked (true), set the layer's visibility to true
            epaLayer.visible = epaLayerToggle.checked;
          });

  });

  view.when(() => {
          // get the first layer in the collection of operational layers in the WebMap
          // when the resources in the MapView have loaded.
          const featureLayer = map.layers.getItemAt(0);

          const legend = new Legend({
            view: view,
            layerInfos: [
              {
                layer: featurelayer,
                title: "Region 11 Counties"
              }
            ]
          });

          // Add widget to the bottom right corner of the view
          view.ui.add(legend, "bottom-right");
        });

});
