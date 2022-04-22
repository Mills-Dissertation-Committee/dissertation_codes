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

              /************************************************
               *
               * Create a layer from an existing Portal item hosted
               * in ArcGIS Online using the ID of the item.
               *
               *************************************************/
              Layer.fromPortalItem({
                portalItem: {
                  // autocasts as new PortalItem()
                  id: "8444e275037549c1acab02d2626daaee"
                }
              })
                .then(addLayer)
                .catch(rejection);

              // Adds the layer to the map once it loads
              function addLayer(layer) {
                map.add(layer);
              }

              function rejection(error) {
                console.log("Layer failed to load: ", error);
              }

              /************************************************
               *
               * Create a layer for EPA Stations
               *
               *
               *************************************************/

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
