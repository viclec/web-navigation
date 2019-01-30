let latitude, longitude, map;

// Initialize the platform object:
var platform = new H.service.Platform({
    'app_id': 'xDSbno3QHRzMNaBMJwGY',
    'app_code': '5E5JCYgLqWrVGmxCDlisFA'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function findRoute(){
    axios.get('https://route.api.here.com/routing/7.2/calculateroute.json?app_id=xDSbno3QHRzMNaBMJwGY&app_code=5E5JCYgLqWrVGmxCDlisFA&waypoint0=geo!52.5,13.4&waypoint1=geo!52.5,13.45&mode=fastest;car;traffic:disabled')
    .then(result => {
        console.log(result)
    })
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude; 

    
// Instantiate (and display) a map object:
    map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.normal.map,
    {
        zoom: 19,
        center: { lng: longitude, lat: latitude }
    });

    // Define a variable holding SVG mark-up that defines an icon image:
    var svgMarkup = '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup),
    coords = {lat: latitude, lng: longitude},
    marker = new H.map.Marker(coords, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);
}

(() => {
    getLocation();

    document.querySelector('#find-route').addEventListener('click', findRoute);
})()