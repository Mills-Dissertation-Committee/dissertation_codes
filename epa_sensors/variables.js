// CROSS-REFERENCED VARIABLES
var i = 0;

// EPA VARIABLES
var epaName = [];
var epaPoint = [];
var epaLatitude = [];
var epaLongitude = [];
var epaScale = [];
var epaScaleDef = [];
var epaMonitorObj = [];

// This array is used for CSV data imported to the textarea.
var Data = [];

var epaLayer;

/**************************************************
 * Define the specification for each field to create
 * in the Point-Source and Pollutant Layers
 **************************************************/

 var epaFields = [
   {
     name: "epaName",
     alias: "epaName",
     type: "string"
   }, {
     name: "epaLatitude",
     alias: "epaLatitude",
     type: "double"
   }, {
     name: "epaLongitude",
     alias: "epaLongitude",
     type: "double"
   }, {
     name: "epaScale",
     alias: "epaScale",
     type: "string"
   }, {
     name: "epaScaleDef",
     alias: "epaScaleDef",
     type: "string"
   }, {
     name: "epaMonitorObj",
     alias: "epaMonitorObj",
     type: "string"
   }];

// Set up popup template for the Point-Source layer
var epaTemplate = {
  title: "{epaName}<br>Object ID: {ObjectID}",
  content: [{
    type: "fields",
    fieldInfos: [{
      fieldName: "epaScale",
      label: "epaScale",
      visible: true
    }, {
      fieldName: "epaScaleDef",
      label: "epaScaleDef",
      visible: true
    }, {
      fieldName: "epaMonitorObj",
      label: "epaMonitorObj",
      visible: true
    }]
  }]
};

/**************************************************
 * Define the renderer for symbolizing point sources.
 **************************************************/

var epaRenderer = {
  type: "simple", // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    style: "circle",
    size: 10,
    color: "white",
    outline: {
      width: 1,
      color: "black",
      style: "solid"
    }
  }
    };

    const epaLabelClass = {
      // autocasts as new LabelClass()
      symbol: {
        type: "text",  // autocasts as new TextSymbol()
        color: "black",
        font: {  // autocast as new Font()
          family: "Avenir Next LT Pro Regular",
          size: 12,
          weight: "bold"
        }
      },
  labelPlacement: "above-right",
  labelExpressionInfo: {
    expression: "epaName"
  }
    };
