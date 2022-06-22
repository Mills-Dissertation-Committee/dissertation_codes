require(["esri/Map",
          "esri/views/SceneView",
          "esri/widgets/Legend",
          "esri/layers/Layer"], (
  Map,
  SceneView,
  Legend,
  Layer
) => {
  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new SceneView({
    map: map,
    container: "viewDiv",
    zoom: 9,
    center: [-97.7, 30.2]
  });

  // ADD REGION 11 COUNTIES TO THE MAP.
  require(["esri/layers/GeoJSONLayer",
            "esri/renderers/SimpleRenderer",
            "esri/symbols/SimpleFillSymbol"], function(
    GeoJSONLayer,
    SimpleRenderer,
    SimpleFillSymbol){
    // points to the states layer in a service storing U.S. census data
    const geojsonlayer = new GeoJSONLayer({
      url: "geojson_files/region_11_counties.geojson"
    });

    geojsonlayer.opacity = 0.25;
    geojsonlayer.id = "Region 11 Counties";

    geojsonlayer.renderer = new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: "darkgreen",
          outline: {
            color: "black",
            width: "2px"
          }
        })
      });

    map.add(geojsonlayer);  // adds the layer to the map

    // Create a variable referencing the checkbox node
      const region11LayerToggle = document.getElementById("region11Layer");

      // Listen to the change event for the checkbox
      region11LayerToggle.addEventListener("change", () => {
        // When the checkbox is checked (true), set the layer's visibility to true
        geojsonlayer.visible = region11LayerToggle.checked;
      });

  });

  // ADD EPA SENSORS TO THE MAP.
  require([
      "esri/layers/FeatureLayer",
      "esri/geometry/Point"
    ], function(FeatureLayer, Point) {
      loadScript('readCSVepa.js', function() {                 // This script reads the Point-Source Emissions CSV.
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
                epaName: epaName[i],
                ObjectID: parseInt(i),
                epaScale: epaScale[i],
                epaScaleDef: epaScaleDef[i],
                epaMonitorObj: epaMonitorObj[i]
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
              id: "EPA Monitors",
              source: epaPoint, // autocast as an array of esri/Graphic
              // create an instance of esri/layers/support/Field for each field object
              fields: epaFields, // This is required when creating a layer from Graphics
              objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
              renderer: epaRenderer, // set the visualization on the layer
              popupTemplate: epaTemplate
              /*,
              labelingInfo: [epaLabelClass]*/
            });

            map.add(epaLayer);
          }

        });
        // Create a variable referencing the checkbox node
          const epaLayerToggle = document.getElementById("epaLayer");

          // Listen to the change event for the checkbox
          epaLayerToggle.addEventListener("change", () => {
            // When the checkbox is checked (true), set the layer's visibility to true
            epaLayer.visible = epaLayerToggle.checked;
          });

  });

  // ADD EPA SENSORS TO THE MAP.
  require([
      "esri/layers/FeatureLayer",
      "esri/geometry/Point"
    ], function(FeatureLayer, Point) {
      loadScript('readCSVpa.js', function() {                 // This script reads the Point-Source Emissions CSV.
        /**************************************************
         * Create graphics with textarea data
         **************************************************/
          // raw CSV data from textarea.
          Data = PlottingPA.value.split('\n');
          var i = 0;

          // +2 to skip the header and the empty line at the bottom.
          while(Data.length > (i + 2))
          {
              Line = Data[i+1].split(",");

              paID[i] = Line[0];
              paLatitude[i] = Line[1];
              paLongitude[i] = Line[2];

              paPoint[i] =
              {
              geometry: new Point({
                x: paLongitude[i],
                y: paLatitude[i],
                spatialReference: 4326
              }),
              // select only the attributes you care about
              attributes: {
                epaName: paID[i],
                ObjectID: parseInt(i)
              }
            };
            i++;
          }
          if(Data.length = (i + 2))
          {
            /**************************************************
             * Create a FeatureLayer with the Point-Source Array
             **************************************************/
            paLayer = new FeatureLayer({
              id: "Purple Air Monitors",
              source: paPoint, // autocast as an array of esri/Graphic
              // create an instance of esri/layers/support/Field for each field object
              fields: paFields, // This is required when creating a layer from Graphics
              objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
              renderer: paRenderer, // set the visualization on the layer
              popupTemplate: paTemplate,
            });

            map.add(paLayer);
          }

        });

        // Create a variable referencing the checkbox node
          const paLayerToggle = document.getElementById("paLayer");

          // Listen to the change event for the checkbox
          paLayerToggle.addEventListener("change", () => {
            // When the checkbox is checked (true), set the layer's visibility to true
            paLayer.visible = paLayerToggle.checked;
          });

  });

  // ADD WEATHER STATIONS TO THE MAP.
  require([
      "esri/layers/FeatureLayer",
      "esri/geometry/Point"
    ], function(FeatureLayer, Point) {

  function createWSgraphics() {

  var xhttp = new XMLHttpRequest();
  var url = "https://api.openweathermap.org/data/2.5/box/city?bbox=-100,29,-95,32,10&appid=533f583f4afc41f1cc7a2ebd44ffc1ac";

  xhttp.onreadystatechange = function()
    {
    if (this.readyState == 4 && this.status == 200)
      {
      var weather = xhttp.responseText
      var obj = JSON.parse(weather);
      for (i=0; i < obj.list.length; i++)
        {
        wLongitude[i] = obj.list[i].coord.Lon;
        wLatitude[i] = obj.list[i].coord.Lat;
        Name[i] = obj.list[i].name;
        datetime[i] = obj.list[i].dt;
        temperature[i] = obj.list[i].main.temp;
        sealevel[i] = obj.list[i].main.sea_level;
        groundlevel[i] = obj.list[i].main.grnd_level;
        pressure[i] = obj.list[i].main.pressure;
        humidity[i] = obj.list[i].main.humidity;
        speed[i] = obj.list[i].wind.speed;
        direction[i] = obj.list[i].wind.deg;

        // Defines the locations of the weather stations using coordinates.
        wsPoint[i] =
        {
        geometry: new Point({
          x: wLongitude[i],
          y: wLatitude[i],
          spatialReference: 4326
        }),
        // select only the attributes you care about
        attributes: {
          title: Name[i],
          ObjectID: parseInt(i),
          sealevel: sealevel[i],
          groundlevel: groundlevel[i],
          speed: speed[i],
          direction: direction[i],
          temperature: temperature[i],
          pressure: pressure[i],
          humidity: humidity[i],
          datetime: new Date().valueOf(datetime[i])
        }
      };
        }
        if(i == obj.list.length)
        {
          // Calls the function to create the weather station point layer.
          createwsLayer()
          // The data returned above will be inserted into the Thiessen Polygons.
          getWSdata()
        }
      }
    };
  xhttp.open("GET", url, true);
  xhttp.send();
  }

  // Request the weather station polygon shape data
  function getWSdata() {
    console.log('Getting WS JSON Data!')
    // Data downloaded from the OpenWeatherMap on 12/4/2018.

    var request = new XMLHttpRequest();
    request.open("GET", "weatherstationpolygons-f.json", false);
    request.send(null);
    wsPolyObj = JSON.parse(request.responseText);
  }

  function createwsLayer() {
    wsLayer = new FeatureLayer({
      id: "Weather Stations",
      source: wsPoint, // autocast as an array of esri/Graphic
      // create an instance of esri/layers/support/Field for each field object
      fields: wsFields, // This is required when creating a layer from Graphics
      objectIdField: "Weather Stations", // This must be defined when creating a layer from Graphics
      renderer: windstationRenderer,
      popupTemplate: wsTemplate
    });

    map.add(wsLayer);
  }

    createWSgraphics();
});

// Create a variable referencing the checkbox node
  const wsLayerToggle = document.getElementById("wsLayer");

  // Listen to the change event for the checkbox
  wsLayerToggle.addEventListener("change", () => {
    // When the checkbox is checked (true), set the layer's visibility to true
    wslayer.visible = wsLayerToggle.checked;
  });

  view.when(() => {
          // get the first layer in the collection of operational layers in the WebMap
          // when the resources in the MapView have loaded.
          const firstLayer = map.layers.getItemAt(0);
          const secondLayer = map.layers.getItemAt(1);
          const thirdLayer = map.layers.getItemAt(2);
          const fourthLayer = map.layers.getItemAt(3);

          console.log(map.layers.getItemAt(3).id)

          const legend = new Legend({
            view: view,
            layerInfos: [
              {
                layer: firstLayer,
                title: firstLayer.id
              },
              {
                layer: secondLayer,
                title: secondLayer.id
              },
              {
                layer: thirdLayer,
                title: thirdLayer.id
              },
              {
                layer: fourthLayer,
                title: fourthLayer.id
              }
            ]
          });

          // Add widget to the bottom right corner of the view
          view.ui.add(legend, "bottom-right");

        });



});
