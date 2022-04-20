// CROSS-REFERENCED VARIABLES
var i = 0;

// EPA VARIABLES
var epaName = [];
var epaPoint = [];
var epaLatitude = [];
var epaLongitude = [];
var epaScale = [];

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
   }];

// Set up popup template for the Point-Source layer
var epaTemplate = {
  title: "{epaName}<br>Scale: {epaScale}",
  content: [{
    type: "fields",
    fieldInfos: [{
      fieldName: "epaScale",
      label: "epaScale",
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
    size: 5,
    color: [180, 180, 180, 1],
    outline: {
      width: 1,
      color: [0, 0, 0, 1],
      style: "solid"
    }
  }
    };
