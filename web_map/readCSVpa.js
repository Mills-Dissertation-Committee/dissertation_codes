function el(tid)
{
  return document.getElementById(tid);
}

//LA MOD String Version. A tiny ajax library by Dan Davis.
//https://www.webdeveloper.com/forum/d/242887-read-server-csv-file-into-javascript-array/6
function IO(U, V)
{
  var X = !window.XMLHttpRequest ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
  // Having this as "false" is returning a message to the console.
  X.open(V ? 'PUT' : 'GET', U, false);
  X.setRequestHeader('Content-Type', 'csv')
  X.send(V ? V : '');
  return X.responseText;
}

el("PlottingPA").value = IO("pa_sensors.csv");
