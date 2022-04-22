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

});
