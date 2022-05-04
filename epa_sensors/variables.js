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

// PA VARIABLES
var paID = [];
var paPoint = [];
var paLatitude = [];
var paLongitude = [];

// This array is used for CSV data imported to the textarea.
var Data = [];

var epaLayer;
var paLayer

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

   var paFields = [
     {
       name: "paID",
       alias: "paID",
       type: "string"
     }, {
       name: "epaLatitude",
       alias: "epaLatitude",
       type: "double"
     }, {
       name: "epaLongitude",
       alias: "epaLongitude",
       type: "double"
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

// Set up popup template for the Point-Source layer
var paTemplate = {
  title: "{paID}<br>Object ID: {ObjectID}",
  content: [{
    type: "fields",
    fieldInfos: [{
      fieldName: "paID",
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
    color: "white",
    outline: {
      width: 1,
      color: "black",
      style: "solid"
    }
  }
    };

    var paRenderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        style: "circle",
        size: 5,
        color: "darkgreen",
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
    expression: "$feature.epaName"
  }
    };
