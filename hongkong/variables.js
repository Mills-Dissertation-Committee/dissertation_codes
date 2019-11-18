function stationInfo(StationCode, latitude, longitude, Windlatitude, Windlongitude, StationName, WebcamAngle) {
  this.StationCode = StationCode;
  this.latitude = latitude;
  this.longitude = longitude;
  this.Windlatitude = Windlatitude;
  this.Windlongitude = Windlongitude;
  this.StationName = StationName;
  this.WebcamAngle = WebcamAngle;
}

// 20190821: build AWS Station list
var AWS_Station = new Array();

  AWS_Station[0] = ["hko", "22.301944", "114.174297", "", "", { name_E: "Hong Kong Observatory", name_UC: "香港天文台", name_SC: "香港天文台" }, "0"];

  AWS_Station[1] = new stationInfo("sha", "22.402478", "114.209881", "", "", { name_E: "Sha Tin", name_UC: "沙田", name_SC: "沙田" }, "0");

  AWS_Station[2] = new stationInfo("lfs", "22.468925", "113.983511", "", "", { name_E: "Lau Fau Shan", name_UC: "流浮山", name_SC: "流浮山" }, "270");

  AWS_Station[3] = new stationInfo("tkl", "22.528544", "114.156619", "", "", { name_E: "Ta Kwu Ling", name_UC: "打鼓嶺", name_SC: "打鼓岭" }, "0");

  AWS_Station[4] = new stationInfo("tun", "22.385906", "113.964178", "", "", { name_E: "Tuen Mun", name_UC: "屯門", name_SC: "屯门" }, "0");

  AWS_Station[5] = new stationInfo("hks", "22.247836", "114.173547", "", "", { name_E: "Wong Chuk Hang", name_UC: "黃竹坑", name_SC: "黄竹坑" }, "0");

  AWS_Station[6] = new stationInfo("wgl", "22.182231", "114.303353", "", "", { name_E: "Waglan Island", name_UC: "橫瀾島", name_SC: "横澜岛" }, "0");

  AWS_Station[7] = new stationInfo("gi", "22.284992", "114.112828", "", "", { name_E: "Green Island", name_UC: "青洲", name_SC: "青洲" }, "0");

  AWS_Station[8] = new stationInfo("jkb", "22.315708", "114.255631", "", "", { name_E: "Tseung Kwan O", name_UC: "將軍澳", name_SC: "将军澳" }, "0");

  AWS_Station[9] = new stationInfo("ccb", "22.210858", "114.029433", "", "", { name_E: "Cheung Chau Beach", name_UC: "長洲泳灘", name_SC: "长洲泳滩" }, "90");

  AWS_Station[10] = new stationInfo("kp", "22.311897", "114.172878", "", "", { name_E: "King's Park", name_UC: "京士柏", name_SC: "京士柏" }, "0");

  AWS_Station[11] = new stationInfo("plc", "22.475225", "114.237586", "", "", { name_E: "Tai Mei Tuk", name_UC: "大美督", name_SC: "大美督" }, "0");

  AWS_Station[12] = new stationInfo("slw", "22.288000", "113.904167", "", "", { name_E: "Sha Lo Wan", name_UC: "沙螺灣", name_SC: "沙螺湾" }, "45");

  AWS_Station[13] = new stationInfo("skg", "22.375575", "114.274436", "", "", { name_E: "Sai Kung", name_UC: "西貢", name_SC: "西贡" }, "0");

  AWS_Station[14] = new stationInfo("tme", "22.4683333", "114.363056", "", "", { name_E: "Tap Mun", name_UC: "塔門", name_SC: "塔门" }, "0");

  AWS_Station[15] = new stationInfo("tyw", "22.402825", "114.322992", "", "", { name_E: "Pak Tam Chung", name_UC: "北潭涌", name_SC: "北潭涌" }, "0");

  AWS_Station[16] = new stationInfo("sek", "22.436219", "114.084642", "", "", { name_E: "Shek Kong", name_UC: "石崗", name_SC: "石岗" }, "0");

  AWS_Station[17] = new stationInfo("tms", "22.410436", "114.124475", "", "", { name_E: "Tai Mo Shan", name_UC: "大帽山", name_SC: "大帽山" }, "0");

  AWS_Station[18] = new stationInfo("hka", "22.309350", "113.921989", "22.316503", "113.911875", { name_E: "Chek Lap Kok", name_UC: "赤鱲角", name_SC: "赤鱲角" }, "0");

  // 20180227 resume tc winds station same as tc temp station
  // 20171114 - add tcm lat, lon
  //  stationInfo("tc", "22.357769", "114.217831", "22.357053", "114.219697", { name_E: "Tate's Cairn", name_UC: "大老山", name_SC: "大老山" }, "0");
  AWS_Station[19] = new stationInfo("tc", "22.357769", "114.217831", "", "", { name_E: "Tate's Cairn", name_UC: "大老山", name_SC: "大老山" }, "0");

  AWS_Station[20] = new stationInfo("tpo", "22.445978", "114.178978", "", "", { name_E: "Tai Po", name_UC: "大埔", name_SC: "大埔" }, "0");

  AWS_Station[21] = new stationInfo("ngp", "22.258533", "113.912694", "", "", { name_E: "Ngong Ping", name_UC: "昂坪", name_SC: "昂坪" }, "0");

  AWS_Station[22] = new stationInfo("vp1", "22.264111", "114.155103", "", "", { name_E: "The Peak", name_UC: "山頂", name_SC: "山顶" }, "0");

  AWS_Station[23] = new stationInfo("pen", "22.291231", "114.043444", "", "", { name_E: "Peng Chau", name_UC: "坪洲", name_SC: "坪洲" }, "0");

  AWS_Station[24] = new stationInfo("ssh", "22.501897", "114.111097", "", "", { name_E: "Sheung Shui", name_UC: "上水", name_SC: "上水" }, "0");

  AWS_Station[25] = new stationInfo("twn", "22.383633", "114.107817", "", "", { name_E: "Tsuen Wan Ho Koon", name_UC: "荃灣可觀", name_SC: "荃湾可观" }, "0");

  AWS_Station[26] = new stationInfo("wlp", "22.466508", "114.008767", "", "", { name_E: "Wetland Park", name_UC: "濕地公園", name_SC: "湿地公园" }, "45");

  AWS_Station[27] = new stationInfo("hkp", "22.278211", "114.162092", "", "", { name_E: "Hong Kong Park", name_UC: "香港公園", name_SC: "香港公园" }, "0");

  AWS_Station[28] = new stationInfo("skw", "22.281664", "114.238839", "", "", { name_E: "Shau Kei Wan", name_UC: "筲箕灣", name_SC: "筲箕湾" }, "0");

  AWS_Station[29] = new stationInfo("klt", "22.335114", "114.184717", "", "", { name_E: "Kowloon City", name_UC: "九龍城", name_SC: "九龙城" }, "135");

  AWS_Station[30] = new stationInfo("hpv", "22.270625", "114.183575", "", "", { name_E: "Happy Valley", name_UC: "跑馬地", name_SC: "跑马地" }, "0");

  AWS_Station[31] = new stationInfo("ksc", "22.370283", "114.312478", "", "", { name_E: "Kau Sai Chau", name_UC: "滘西洲", name_SC: "滘西洲" }, "0");

  AWS_Station[32] = new stationInfo("wts", "22.339383", "114.205347", "", "", { name_E: "Wong Tai Sin", name_UC: "黃大仙", name_SC: "黄大仙" }, "0");

  AWS_Station[33] = new stationInfo("sty", "22.214083", "114.218511", "22.197500", "114.211944", { name_E: "Stanley", name_UC: "赤柱", name_SC: "赤柱" }, "0");

  AWS_Station[34] = new stationInfo("ktg", "22.318647", "114.224656", "", "", { name_E: "Kwun Tong", name_UC: "觀塘", name_SC: "观塘" }, "0");

  AWS_Station[35] = new stationInfo("swh", "22.285555", "114.225833", "", "", { name_E: "Sai Wan Ho", name_UC: "西灣河", name_SC: "西湾河" }, "90");

  AWS_Station[36] = new stationInfo("ssp", "22.335833", "114.136944", "", "", { name_E: "Sham Shui Po", name_UC: "深水埗", name_SC: "深水埗" }, "0");

  AWS_Station[37] = new stationInfo("tw", "22.375658", "114.126664", "", "", { name_E: "Tsuen Wan Shing Mun Valley", name_UC: "荃灣城門谷", name_SC: "荃湾城门谷" }, "0");

  AWS_Station[38] = new stationInfo("ty1", "22.344256", "114.110081", "22.345278", "114.086028", { name_E: "Tsing Yi", name_UC: "青衣", name_SC: "青衣" }, "0");

  AWS_Station[39] = new stationInfo("tpk", "22.442606", "114.184031", "", "", { name_E: "Tai Po Kau", name_UC: "大埔滘", name_SC: "大埔滘" }, "45");

  AWS_Station[40] = new stationInfo("kfb", "22.432708", "114.120805", "", "", { name_E: "Kadoorie Farm and Botanic Garden", name_UC: "嘉道理農場暨植物園", name_SC: "嘉道理农场暨植物园" }, "270");

  AWS_Station[41] = new stationInfo("se", "22.309647", "114.213306", "", "", { name_E: "Kai Tak", name_UC: "啟德", name_SC: "启德" }, "0");

  AWS_Station[42] = new stationInfo("sf", "22.293008", "114.168420", "", "", { name_E: "Star Ferry", name_UC: "天星碼頭", name_SC: "天星码头" }, "0");

  AWS_Station[43] = new stationInfo("sc", "22.345911", "113.891061", "", "", { name_E: "Sha Chau", name_UC: "沙洲", name_SC: "沙洲" }, "0");

  AWS_Station[44] = new stationInfo("cch", "22.201111", "114.026669", "", "", { name_E: "Cheung Chau", name_UC: "長洲", name_SC: "长洲" }, "360");

  AWS_Station[45] = new stationInfo("cp1", "22.288888", "114.155833", "", "", { name_E: "Central", name_UC: "中環", name_SC: "中环" }, "90");

  AWS_Station[46] = new stationInfo("hss", "22.218300", "114.214290", "", "", { name_E: "Hong Kong Sea School", name_UC: "香港航海學校", name_SC: "香港航海学校" }, "0");

  AWS_Station[47] = new stationInfo("gsi", "22.265726", "114.160995", "", "", { name_E: "German Swiss International School", name_UC: "德瑞國際學校", name_SC: "德瑞国际学校" }, "180");

  AWS_Station[48] = new stationInfo("tlc", "22.362778", "114.011111", "", "", { name_E: "Tai Lam Chung", name_UC: "大欖涌", name_SC: "大榄涌" }, "180");

  AWS_Station[49] = new stationInfo("lam", "22.226228", "114.108639", "", "", { name_E: "Lamma Island", name_UC: "南丫島", name_SC: "南丫岛" }, "315");

  AWS_Station[50] = new stationInfo("se1", "22.304722", "114.217222", "", "", { name_E: "Kai Tak Runway Park", name_UC: "啟德跑道公園", name_SC: "启德跑道公园" }, "0");

  AWS_Station[51] = new stationInfo("ylp", "22.440800", "114.018200", "", "", { name_E: "Yuen Long Park", name_UC: "元朗公園", name_SC: "元朗公园" }, "0");

  AWS_Station[52] = new stationInfo("elc", "22.492611", "114.124028", "", "", { name_E: "Elegantia College in Sheung Shui", name_UC: "上水風采中學", name_SC: "上水风采中学" }, "315");

  AWS_Station[53] = new stationInfo("vpa", "22.276", "114.146", "", "", { name_E: "Victoria Peak", name_UC: "太平山", name_SC: "太平山" }, "90");

  AWS_Station[54] = new stationInfo("vpb", "22.276", "114.146", "", "", { name_E: "Victoria Peak", name_UC: "太平山", name_SC: "太平山" }, "23");

  //AWS_Station[55] = new stationInfo("cwa", "22.26333", "114.29972", "", "", { name_E: "Clear Water Bay", name_UC: "清水灣", name_SC: "清水湾" }, "90");
  //AWS_Station[56] = new stationInfo("cwb", "22.26333", "114.29972", "", "", { name_E: "Clear Water Bay", name_UC: "清水灣", name_SC: "清水湾" }, "225");

  // 20181213 - use CWA temp station lat lon
  AWS_Station[55] = new stationInfo("cwa", "22.263389", "114.299769", "", "", { name_E: "Clear Water Bay", name_UC: "清水灣", name_SC: "清水湾" }, "90");

  AWS_Station[56] = new stationInfo("cwb", "22.263389", "114.299769", "", "", { name_E: "Clear Water Bay", name_UC: "清水灣", name_SC: "清水湾" }, "225");

  AWS_Station[57] = new stationInfo("ic1", "22.303056", "114.160278", "", "", { name_E: "International Commerce Centre", name_UC: "環球貿易廣場", name_SC: "环球贸易广场" }, "135");

  AWS_Station[58] = new stationInfo("ic2", "22.303056", "114.160278", "", "", { name_E: "International Commerce Centre", name_UC: "環球貿易廣場", name_SC: "环球贸易广场" }, "225");

  AWS_Station[59] = new stationInfo("np", "22.294444", "114.199722", "", "", { name_E: "North Point", name_UC: "北角", name_SC: "北角" }, "0");

  return AWS_Station;
})();


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
