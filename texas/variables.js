// CROSS-REFERENCED VARIABLES
var i = 0;

// POLLUTION POINT-SOURCE VARIABLES
var pointSource = [];
var psPoint = [];
var pLatitude = [];
var pLongitude = [];
var identifier = [];
var account = [];
var region = [];
var company = [];
var site = [];
var reportingyear = [];
var county = [];
var sic = [];
var sicdescription = [];
// Air pollutant data in tons per year.
var cotpy = [];
var noxtpy = [];
var pbtpy = [];
var pm10tpy = [];
var pm25tpy = [];
var so2tpy = [];
var voctpy = [];
// This array is used for CSV data imported to the textarea.
var Data = [];

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

// POLLUTION VARIABLES
var ptPoint = [];
var ptLatitude = [];
var ptLongitude = [];
// Max numbers are used to standardize data.
var coMax = 0;
var noxMax = 0;
var pbMax = 0;
var pm10Max = 0;
var pm25Max = 0;
var so2Max = 0;
var vocMax = 0;
// These variables are used for finding the nearest weather station.
var nearest;
var candidate;
var array;           // This cleverly coded value allows for attributes of the nearest to be used.
var pti = 0;         // variable i for the pollution transport (used to limit the number of Pollutants on map.)
var PollutantLoop;
var z;               // Used for NearestVertex Array.
var mathdirection;

var psLayer, wsLayer, wsPolyLayer, cpLayer, ptLayer;

/**************************************************
 * Define the specification for each field to create
 * in the Point-Source and Pollutant Layers
 **************************************************/

 var psFields = [
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
     name: "pLatitude",
     alias: "pLatitude",
     type: "float"
   }, {
     name: "pLongitude",
     alias: "pLongitude",
     type: "float"
   }, {
     name: "identifier",
     alias: "identifier",
     type: "string"
   }, {
     name: "account",
     alias: "account",
     type: "string"
   }, {
     name: "region",
     alias: "region",
     type: "number"
   }, {
     name: "company",
     alias: "company",
     type: "string"
   }, {
     name: "site",
     alias: "site",
     type: "string"
   }, {
     name: "county",
     alias: "county",
     type: "string"
   }, {
     name: "sic",
     alias: "sic",
     type: "string"
   }, {
     name: "sicdescription",
     alias: "sicdescription",
     type: "string"
   }, {
     name: "reportingyear",
     alias: "reportingyear",
     type: "string"
   }, {
     name: "cotpy",
     alias: "cotpy",
     type: "float"
   }, {
     name: "noxtpy",
     alias: "noxtpy",
     type: "float"
   }, {
     name: "pbtpy",
     alias: "pbtpy",
     type: "float"
   }, {
     name: "pm10tpy",
     alias: "pm10tpy",
     type: "float"
   }, {
     name: "pm25tpy",
     alias: "pm25tpy",
     type: "float"
   }, {
     name: "so2tpy",
     alias: "so2tpy",
     type: "float"
   }, {
     name: "voctpy",
     alias: "voctpy",
     type: "float"
   }];

   /**************************************************
    * Define the specification for each field to create
    * in the Weather Station layers.
    **************************************************/

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
       type: "float"
     }, {
       name: "wLongitude",
       alias: "wLongitude",
       type: "float"
     }, {
       name: "Name",
       alias: "Name",
       type: "string"
     }, {
       name: "temperature",
       alias: "temperature",
       type: "float"
     }, {
       name: "pressure",
       alias: "pressure",
       type: "number"
     }, {
       name: "sealevel",
       alias: "sealevel",
       type: "float"
     }, {
       name: "groundlevel",
       alias: "groundlevel",
       type: "float"
     }, {
       name: "humidity",
       alias: "humidity",
       type: "float"
     }, {
       name: "speed",
       alias: "speed",
       type: "float"
     }, {
       name: "direction",
       alias: "direction",
       type: "float"
     }, {
       name: "datetime",
       alias: "datetime",
       type: "date"
     }];

// Set up popup template for the Point-Source layer
var psTemplate = {
  title: "{title}<br>Region: {region}",
  content: [{
    type: "fields",
    fieldInfos: [{
      fieldName: "noxtpy",
      label: "noxTPY",
      visible: true
    }, {
      fieldName: "pbtpy",
      label: "pbTPY",
      visible: true
    }, {
      fieldName: "pm10tpy",
      label: "pm10TPY",
      visible: true
    }, {
      fieldName: "pm25tpy",
      label: "pm25TPY",
      visible: true
    }, {
      fieldName: "so2TPY",
      label: "so2TPY",
      visible: true
    }, {
      fieldName: "voctpy",
      label: "vocTPY",
      visible: true,
    }, {
      fieldName: "company",
      label: "Company",
      visible: true
    }, {
      fieldName: "identifier",
      label: "Identifier",
      visible: true
    }, {
      fieldName: "sic",
      label: "SIC",
      visible: true
    }, {
      fieldName: "sicdescription",
      label: "SIC Description",
      visible: true
    }, {
      fieldName: "reportingyear",
      label: "Reporting Year",
      visible: true
    }]
  }]
};

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
/**************************************************
 * Define the renderer for symbolizing point sources.
 **************************************************/

var pointsourceRenderer = {
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

    /**************************************************
     * Define the renderer for symbolizing wind station.
     **************************************************/

    var windstationRenderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        style: "circle",
        size: 2,
        color: [255, 255, 255, 1],
        outline: {
          width: 1,
          color: [255, 255, 255, 1],
          style: "solid"
          }
        }
      };

      /**************************************************
       * Define the renderer for symbolizing wind station thiessen polygons.
       **************************************************/
       /*****************************************************************
        * Define symbols for each class break.
        *****************************************************************/

       var northwest = {
         type: "simple-fill", // autocasts as new SimpleFillSymbol()
         color: "gray",
         style: "solid",
         outline: {
           width: 0.5,
           color: "white"
         }
       };

       var northeast = {
         type: "simple-fill", // autocasts as new SimpleFillSymbol()
         color: "blue",
         style: "solid",
         outline: {
           width: 0.5,
           color: "white"
         }
       };

       var southwest = {
         type: "simple-fill", // autocasts as new SimpleFillSymbol()
         color: "cyan",
         style: "solid",
         outline: {
           width: 0.5,
           color: "white"
         }
       };

       var southeast = {
         type: "simple-fill", // autocasts as new SimpleFillSymbol()
         color: "orange",
         style: "solid",
         outline: {
           width: 0.5,
           color: "white"
         }
       };

       var eastnorth = {
         type: "simple-fill", // autocasts as new SimpleFillSymbol()
         color: "violet",
         style: "solid",
         outline: {
           width: 0.5,
           color: "white"
         }
       };

       var eastsouth = {
         type: "simple-fill", // autocasts as new SimpleFillSymbol()
         color: "yellow",
         style: "solid",
         outline: {
           width: 0.5,
           color: "white"
         }
       };

       var westnorth = {
         type: "simple-fill", // autocasts as new SimpleFillSymbol()
         color: "magenta",
         style: "solid",
         outline: {
           width: 0.5,
           color: "white"
         }
       };

       var westsouth = {
         type: "simple-fill", // autocasts as new SimpleFillSymbol()
         color: "green",
         style: "solid",
         outline: {
           width: 0.5,
           color: "black"
         }
       };

      var windstationPolygonRenderer = {
        type: "class-breaks", // autocasts as new ClassBreaksRenderer()
        field: "direction",
        classBreakInfos: [{
          minValue: 0,
          maxValue: 44.9999,
          opacity: .2,
          symbol: northeast,
          label: "North-East"
        }, {
          minValue: 45,
          maxValue: 89.9999,
          symbol: eastnorth,
          label: "East-North"
        }, {
          minValue: 90,
          maxValue: 134.9999,
          symbol: eastsouth,
          label: "East-South"
        }, {
          minValue: 135,
          maxValue: 179.9999,
          symbol: southeast,
          label: "South-East"
        }, {
          minValue: 180,
          maxValue: 224.9999,
          symbol: southwest,
          label: "South-West"
        }, {
          minValue: 225,
          maxValue: 269.9999,
          symbol: westsouth,
          label: "West-South"
        }, {
          minValue: 270,
          maxValue: 314.9999,
          symbol: westnorth,
          label: "West-North"
        }, {
          minValue: 315,
          maxValue: 360,
          symbol: northwest,
          label: "North-West"
        }]
      };

      /**************************************************
       * Define the renderer for symbolizing pollutant particles.
       **************************************************/

      var pollutantRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          style: "circle",
          size: 2,
          color: [255, 0, 0, 1],
          outline: {
            width: 1,
            color: [255, 0, 0, 1],
            style: "solid"
          }
        },
        visualVariables: [
          {
            type: "opacity",
            field: "noxTPY",
            stops: [
              {
                value: 10,
                opacity: 0.1
              },
              {
                value: 6000,
                opacity: 1.0
              }]
          }]
          };
