require(["esri/Map", "esri/views/SceneView", "esri/layers/Layer"], (
  Map,
  SceneView,
  Layer
) => {
  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new SceneView({
    map: map,
    container: "viewDiv",
    zoom: 7,
    center: [-87, 34]
  });

  /************************************************
   *
   * Create a layer from an existing Portal item hosted
   * in ArcGIS Online using the ID of the item.
   *
   *************************************************/
  Layer.fromPortalItem({
    portalItem: {
      // autocasts as new PortalItem()
      id: "8444e275037549c1acab02d2626daaee"
    }
  })
    .then(addLayer)
    .catch(rejection);

  // Adds the layer to the map once it loads
  function addLayer(layer) {
    map.add(layer);
  }

  function rejection(error) {
    console.log("Layer failed to load: ", error);
  }
});
