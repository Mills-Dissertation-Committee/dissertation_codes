function loadScript(src, callback)
{
        let script = document.createElement('script')  // Creates the <script> element.
        document.head.append(script)                   // Places the element in the document's <head> section.
        script.src = src                               // Adds the src, <script src='...'>.
        script.onload = () => callback()               // Adds the onload, <script src='...' onload='...()'>
  }

  loadScript('variables.js', function() {             // Variables.
    loadScript('map.js', function() {                 // Load the map.
      loadScript('leaflet-heat.js', function() {     // Leaflet heatmap javascript.
        loadScript('heatmap.js', function() {

        })
      })
    })
  })
