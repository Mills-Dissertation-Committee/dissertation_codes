require([
    "esri/layers/FeatureLayer",
    "esri/geometry/Polygon"
  ], function(FeatureLayer, Polygon) {
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
            epaMonitoringObj[i] = Line[5];

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
              ObjectID: parseInt(i),
              epa_scale: epaScale[i],
              epa_scale_def: epaScaleDef[i],
              epa_monitoring_obj: epaMonitoringObj[i]
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
