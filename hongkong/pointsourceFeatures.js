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
      "esri/tasks/support/Query"
    ], function(MapView, Map, esriRequest, geometryEngine, SpatialReference, FeatureLayer, Point, Polygon,
      Legend, ClassBreaksRenderer, Query) {

      /**************************************************
       * Create the map and view
       **************************************************/
      var map = new Map({
        basemap: "dark-gray"
      });

      // Create MapView
      var view = new MapView({
        container: "viewDiv",
        map: map,
        extent:
          { // autocasts as new Extent()
          xmin: -106.6460,
          ymin: 25.8371,
          xmax: -93.5083,
          ymax: 36.5007,
          spatialReference: 4326
        },
        // customize ui padding for legend placement
        ui: {
          padding: {
            bottom: 15,
            right: 0
          }
        }
      });

      function createwsLayer() {
          wsLayer = new FeatureLayer({
                source: wsPoint, // autocast as an array of esri/Graphic
                // create an instance of esri/layers/support/Field for each field object
                fields: wsFields, // This is required when creating a layer from Graphics
                objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
                renderer: windstationRenderer, // set the visualization on the layer
                popupTemplate: wsTemplate
              });

              map.add(wsLayer);

              /* Code used for printing data to console for weather station CSV.
              console.log("Useless,OID,Longitude,Latitude")
              for(i=0; i<160; i++)
              {
                console.log("," + i + "," + wLongitude[i] + "," + wLatitude[i]);
              }
              */
            }

      // Request the weather station polygon shape data
      function getWSdata() {
        console.log('Getting WS JSON Data!')
        // Data downloaded from the OpenWeatherMap on 12/4/2018.

        var request = new XMLHttpRequest();
        request.open("GET", "weatherstationpolygons-f.json", false);
        request.send(null);
        wsPolyObj = JSON.parse(request.responseText);

        createWSPolyGraphics()
      }

      /**************************************************
       * Create graphics with returned geojson data
       **************************************************/

      function createWSPolyGraphics() {
        console.log('WSPolyGraphics is running!');

        for (i=0; i < wsPolyObj.features.length; i++)
          {
          // Defines the locations of the weather stations using coordinates.
          wsPolygon[i] =
          {
          type: "polygon",
          geometry: new Polygon({
            rings: wsPolyObj.features[i].geometry.rings,
            spatialReference: 4326
          }),
          // select only the attributes you care about
          attributes: {
            title: Name[wsPolyObj.features[i].attributes.Input_FID],
            ObjectID: wsPolyObj.features[i].attributes.Input_FID,
            sealevel: sealevel[wsPolyObj.features[i].attributes.Input_FID],
            groundlevel: groundlevel[wsPolyObj.features[i].attributes.Input_FID],
            speed: speed[wsPolyObj.features[i].attributes.Input_FID],
            direction: direction[wsPolyObj.features[i].attributes.Input_FID],
            temperature: temperature[wsPolyObj.features[i].attributes.Input_FID],
            pressure: pressure[wsPolyObj.features[i].attributes.Input_FID],
            humidity: humidity[wsPolyObj.features[i].attributes.Input_FID],
            datetime: new Date().valueOf(datetime[wsPolyObj.features[i].attributes.Input_FID])
          }
        };
        }
        if(i == wsPolyObj.features.length)
        {
          createWSPolyLayer()
        }
      }

        function createWSPolyLayer() {
          console.log('Create Layer is running!');
          wsPolyLayer = new FeatureLayer({
            source: wsPolygon, // autocast as an array of esri/Graphic
            // create an instance of esri/layers/support/Field for each field object
            fields: wsFields, // This is required when creating a layer from Graphics
            objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
            renderer: windstationPolygonRenderer, // set the visualization on the layer
            opacity: .2,
            popupTemplate: wsTemplate
          });

        map.add(wsPolyLayer);


              var legend = new Legend({
                    view: view,
                    container: "legendDiv",
                    layerInfos: [{
                      layer: wsPolyLayer,
                      title: "Thiessen Polygons for Wind"
                    }]
                  });

                  // Add legend widget to the top left corner of the view
                  view.ui.add(legend, "top-left");

        createPTgraphic()
      }

      function createPTgraphic()
      {
      console.log('Create PTgraphic is running.')
      // Reset i to 0 to start creating the pollution transport.
      i=0;
      while(Data.length > (i + 2))
      {
        nearest = geometryEngine.nearestVertex(psPoint[i].geometry,wsPoint[0].geometry);
        for(z = 1; z < 160; z=z+1)
        {
        candidate = geometryEngine.nearestVertex(psPoint[i].geometry,wsPoint[z].geometry);
        if(candidate.distance < nearest.distance)
        {
          nearest = candidate;
          array = z;
        }
        }
        if(direction[array] >= 180)
        {
          mathdirection = direction[array] - 180;
        }
        else {
          mathdirection = direction[array] + 180;
        }
          ptLatitude[i] = parseFloat(pLatitude[i]) + ((Math.sin(mathdirection * Math.PI / 180) *  speed[array] )/69);
          ptLongitude[i] = parseFloat(pLongitude[i]) + ((Math.cos(mathdirection * Math.PI / 180) * speed[array] )/69);

          ptPoint[i] =
          {
          geometry: new Point({
            x: ptLongitude[i],
            y: ptLatitude[i],
            spatialReference: 4326
          }),
          // select only the attributes you care about
          attributes: {
            title: site[i],
            ObjectID: parseInt(i),
            cotpy: cotpy[i],
            noxtpy: noxtpy[i],
            pbtpy: pbtpy[i],
            pm10tpy: pm10tpy[i],
            pm25tpy: pm25tpy[i],
            so2tpy: so2tpy[i],
            voctpy: voctpy[i],
            company: company[i],
            identifier: identifier[i],
            sic: sic[i],
            sicdescription: sicdescription[i],
            region: region[i],
            reportingyear: reportingyear[i]
          }
        };
        i++;
      }
      pti++
      createPTlayer()
    }

      function createPTlayer() {
        pTLayer = new FeatureLayer({
          source: ptPoint, // autocast as an array of esri/Graphic
          // create an instance of esri/layers/support/Field for each field object
          fields: psFields, // This is required when creating a layer from Graphics
          objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
          renderer: pollutantRenderer, // set the visualization on the layer
          popupTemplate: psTemplate
        });

        map.add(pTLayer);
        console.log('Hour ' + pti)
        addPTgraphic()
      }

      function addPTgraphic()
      {
      i=0;
      pti++;
            console.log('Hour ' + pti)
      if(pti>11){
      clearInterval(PollutantLoop);
      console.log('All data loaded!')

      }
      while(Data.length > (i + 2))
      {
        nearest = geometryEngine.nearestVertex(psPoint[i].geometry,wsPoint[0].geometry);
        for(z = 1; z < 160; z=z+1)
        {
        candidate = geometryEngine.nearestVertex(ptPoint[i].geometry,wsPoint[z].geometry);
        if(candidate.distance < nearest.distance)
        {
          nearest = candidate;
          array = z;
        }
        }
          if(direction[array] >= 180)
          {
            mathdirection = direction[array] - 180;
          }
          else {
            mathdirection = direction[array] + 180;
          }
          ptLatitude[i] = parseFloat(ptLatitude[i]) + ((Math.sin(mathdirection * Math.PI / 180) *  speed[array] )/69);
          ptLongitude[i] = parseFloat(ptLongitude[i]) + ((Math.cos(mathdirection * Math.PI / 180) * speed[array] )/69);

          ptPoint[i] =
          {
          geometry: new Point({
            x: ptLongitude[i],
            y: ptLatitude[i],
            spatialReference: 4326
          }),
          // select only the attributes you care about
          attributes: {
            title: site[i],
            ObjectID: parseInt(i),
            cotpy: cotpy[i],
            noxtpy: noxtpy[i],
            pbtpy: pbtpy[i],
            pm10tpy: pm10tpy[i],
            pm25tpy: pm25tpy[i],
            so2tpy: so2tpy[i],
            voctpy: voctpy[i],
            company: company[i],
            identifier: identifier[i],
            sic: sic[i],
            sicdescription: sicdescription[i],
            region: region[i],
            reportingyear: reportingyear[i]
          }
        };
        i++;
      }

      if(Data.length == (i + 2))
      {
        addPTlayer()
      }
    }

      function addPTlayer() {
        pTLayer = new FeatureLayer({
          source: ptPoint, // autocast as an array of esri/Graphic
          // create an instance of esri/layers/support/Field for each field object
          fields: psFields, // This is required when creating a layer from Graphics
          objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
          renderer: pollutantRenderer, // set the visualization on the layer
          popupTemplate: psTemplate
        });

        map.add(pTLayer);

                if(pti == 2)
                {
                  PollutantLoop = setInterval(addPTgraphic, 5000);
                }
        }


      view.when(function() {
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

                identifier[i] = Line[0];
                pLatitude[i] = Line[1];
                pLongitude[i] = Line[2];
                account[i] = Line[3];
                region[i] = Line[4];
                company[i] = Line[5];
                site[i] = Line[6];
                reportingyear[i] = Line[7];
                county[i] = Line[8];
                sic[i] = Line[9];
                sicdescription[i] = Line[10];

                // Pops value from the end, in order from last variable, and parses as a Float.
                voctpy[i] = parseFloat(Line.pop());
                so2tpy[i] = parseFloat(Line.pop());
                pm25tpy[i] = parseFloat(Line.pop());
                pm10tpy[i] = parseFloat(Line.pop());
                pbtpy[i] = parseFloat(Line.pop());
                noxtpy[i] = parseFloat(Line.pop());
                cotpy[i] = parseFloat(Line.pop());

                // Assigns new 'Max' value when TRUE.
                if(voctpy[vocMax] < voctpy[i])
                  {vocMax = i;}
                if(so2tpy[so2Max] < so2tpy[i])
                  {so2Max = i;}
                if(pm25tpy[pm25Max] < pm25tpy[i])
                  {pm25Max = i;}
                if(pm10tpy[pm10Max] < pm10tpy[i])
                  {pm10Max = i;}
                if(pbtpy[pbMax] < pbtpy[i])
                  {pbMax = i;}
                if(noxtpy[noxMax] < noxtpy[i])
                  {noxMax = i;}
                if(cotpy[coMax] < cotpy[i])
                  {coMax = i;}

                psPoint[i] =
                {
                geometry: new Point({
                  x: pLongitude[i],
                  y: pLatitude[i],
                  spatialReference: 4326
                }),
                // select only the attributes you care about
                attributes: {
                  title: site[i],
                  ObjectID: parseInt(i),
                  cotpy: cotpy[i],
                  noxtpy: noxtpy[i],
                  pbtpy: pbtpy[i],
                  pm10tpy: pm10tpy[i],
                  pm25tpy: pm25tpy[i],
                  so2tpy: so2tpy[i],
                  voctpy: voctpy[i],
                  company: company[i],
                  identifier: identifier[i],
                  sic: sic[i],
                  sicdescription: sicdescription[i],
                  region: region[i],
                  reportingyear: reportingyear[i]
                }
              };
              i++;
            }
            if(Data.length = (i + 2))
            {
              /**************************************************
               * Create a FeatureLayer with the Point-Source Array
               **************************************************/
              psLayer = new FeatureLayer({
                source: psPoint, // autocast as an array of esri/Graphic
                // create an instance of esri/layers/support/Field for each field object
                fields: psFields, // This is required when creating a layer from Graphics
                objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
                renderer: pointsourceRenderer, // set the visualization on the layer
                popupTemplate: psTemplate
              });
              cpLayer = new FeatureLayer({
                source: psPoint, // autocast as an array of esri/Graphic
                // create an instance of esri/layers/support/Field for each field object
                fields: psFields, // This is required when creating a layer from Graphics
                objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
                renderer: pollutantRenderer, // set the visualization on the layer
                popupTemplate: psTemplate
              });

              map.add(psLayer);
              map.add(cpLayer);
            }

          var xhttp = new XMLHttpRequest();
          var url = "https://api.openweathermap.org/data/2.5/box/city?bbox=-106.6460,25.8371,-93.5083,36.5007,10&appid=533f583f4afc41f1cc7a2ebd44ffc1ac";

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
            }
          xhttp.open("GET", url, true);
          xhttp.send();
        });
        });
        });
