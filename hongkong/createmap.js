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
