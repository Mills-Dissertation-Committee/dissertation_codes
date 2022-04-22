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

      /**************************************************
       * Create the map and view
       **************************************************/
      var map = new Map({
        basemap: "dark-gray-vector"
      });

      // Create MapView
      var view = new MapView({
        container: "viewDiv",
        map: map,
        extent:
          { // autocasts as new Extent()
          xmin: -106.6460,
          ymin: 25.8371,
          xmax: -93.5083,
          ymax: 36.5007,
          spatialReference: 4326
        },
        // customize ui padding for legend placement
        ui: {
          padding: {
            bottom: 15,
            right: 0
          }
        }
      });

      function addEPAlayer() {
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


      view.when(function() {
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
                  title: epaName[i],
                  scale: epaScale[i]
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
