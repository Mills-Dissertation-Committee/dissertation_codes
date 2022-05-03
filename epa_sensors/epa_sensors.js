require([
    "esri/layers/FeatureLayer",
    "esri/geometry/Polygon"
  ], function(FeatureLayer, Polygon) {
    loadScript('readCSV.js', function() {                 // This script reads the Point-Source Emissions CSV.
      /**************************************************
       * Create graphics with textarea data
       **************************************************/
        // raw CSV data from textarea.
        Data = PlottingPointSource.value.split('\n');

        // +2 to skip the header and the empty line at the bottom.
        while(Data.length > (i + 2))
        {
            Line = Data[i+1].split(",");

            epa_name[i] = Line[0];
            epa_latitude[i] = Line[1];
            epa_longitude[i] = Line[2];
            epa_scale[i] = Line[3];
            epa_scale_def[i] = Line[4];
            epa_monitoring_obj[i] = Line[5];

            epaPoint[i] =
            {
            geometry: new Point({
              x: epa_longitude[i],
              y: epa_latitude[i],
              spatialReference: 4326
            }),
            // select only the attributes you care about
            attributes: {
              title: epa_name[i],
              ObjectID: parseInt(i),
              epa_scale: epa_scale[i],
              epa_scale_def: epa_scale_def[i],
              epa_monitoring_obj: epa_monitoring_obj[i]
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
