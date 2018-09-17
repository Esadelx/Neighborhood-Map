var details = {};
var markers = [];
var map;
var infowindow;
/*
 * Animate the marker points 
 */
function markerClicked(marker) {

    map.setCenter(marker.position);
    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
        marker.setAnimation(null);
    }, 1400);

    if (details[marker.title] == "error") {
        infowindow.setContent("Cant be loaded ");
    }
    else {
        infowindow.setContent("<a href=" + details[marker.title] + " target=\"_blank\">" + marker.title + "</a>");
    }
    infowindow.open(map, marker);
}

/*
 * Init the map and set the point form js/places.js
 */

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.979207, lng: 31.134213},
      zoom: 10
  });

infowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

for (var i in places) {

  var marker = new google.maps.Marker({
      position: places[i].position,
      animation: google.maps.Animation.DROP,
      map: map,
      title: places[i].name
  });

  marker.addListener('click', function () {
      markerClicked(this);
  });

  setInfo(marker.title);
  markers.push(marker);
  bounds.extend(places[i].position);
  locations.push({index: i, title: places[i].name});
}
map.fitBounds(bounds);
map.setCenter(bounds.getCenter());
}


function mapError() {
    alert("Sorry The Map Can't Be Loaded ");
}
