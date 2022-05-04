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
/* COMMENTED OUT LABEL
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
    */

    // WEATHER STATION VARIABLES
    var wsPolygon = [];
    var wsPolyObj;  // Stores the JSON information after it is parsed.
    var weatherStation = [];
    var wsPoint = [];
    var wLatitude = [];
    var wLongitude = [];
    var Name = [];
    var temperature = [];
    var pressure = [];
    var sealevel = [];
    var groundlevel = [];
    var humidity = [];
    var speed = [];
    var direction = [];
    var datetime = [];

    var wsLayer;

    var wsFields = [
      {
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      },
      {
        name: "title",
        alias: "title",
        type: "string"
      }, {
        name: "type",
        alias: "type",
        type: "string"
      }, {
        name: "wLatitude",
        alias: "wLatitude",
        type: "double"
      }, {
        name: "wLongitude",
        alias: "wLongitude",
        type: "double"
      }, {
        name: "Name",
        alias: "Name",
        type: "string"
      }, {
        name: "temperature",
        alias: "temperature",
        type: "double"
      }, {
        name: "pressure",
        alias: "pressure",
        type: "integer"
      }, {
        name: "sealevel",
        alias: "sealevel",
        type: "double"
      }, {
        name: "groundlevel",
        alias: "groundlevel",
        type: "double"
      }, {
        name: "humidity",
        alias: "humidity",
        type: "double"
      }, {
        name: "speed",
        alias: "speed",
        type: "double"
      }, {
        name: "direction",
        alias: "direction",
        type: "double"
      }, {
        name: "datetime",
        alias: "datetime",
        type: "date"
      }];
      // Set up popup template for the Weather Station layer
      var wsTemplate = {
        title: "{title}",
        content: [{
          type: "fields",
          fieldInfos: [{
            fieldName: "speed",
            label: "Wind Speed",
            visible: true
          }, {
            fieldName: "direction",
            label: "Wind Direction",
            visible: true
          }, {
            fieldName: "temperature",
            label: "Temperature",
            visible: true
          }, {
            fieldName: "pressure",
            label: "Pressure",
            visible: true
          }, {
            fieldName: "humidity",
            label: "Humidity",
            visible: true
          }, {
            fieldName: "datetime",
            label: "TimeStamp",
            visible: true
          }, {
            fieldName: "sealevel",
            label: "Sea Level",
            visible: true,
          }, {
            fieldName: "groundlevel",
            label: "Ground Level",
            visible: true
          }]
        }]
      };

      var windstationRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          style: "square",
          size: 5,
          color: "blue",
          outline: {
            width: 1,
            color: "black",
            style: "solid"
            }
          }
        };
