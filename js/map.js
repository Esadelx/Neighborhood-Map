var map;
var details = {};
var markers = [];
var infowindow;

/*
 *  Animate the marker 
 */
function markerClicked(marker) {

    map.setCenter(marker.position);
    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
        marker.setAnimation(null);
    }, 1400);

    if (details[marker.title] == "error") {
        infowindow.setContent("Sorry The Info Link For This Location<br>Can't Be Loaded");
    }
    else {
        infowindow.setContent("<a href=" + details[marker.title] + " target=\"_blank\">" + marker.title + "</a>");
    }
    infowindow.open(map, marker);
}

/*
 * @description Init the map and set the point form js/points.js
 */

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.979207, lng: 31.134213},
      zoom: 8
  });

infowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

for (var i in data) {

  var marker = new google.maps.Marker({
      position: data[i].position,
      animation: google.maps.Animation.DROP,
      map: map,
      title: data[i].name
  });

  marker.addListener('click', function () {
      markerClicked(this);
  });

  setInfo(marker.title);
  markers.push(marker);
  bounds.extend(data[i].position);
  locations.push({index: i, title: data[i].name});
}
map.fitBounds(bounds);
map.setCenter(bounds.getCenter());
}


function mapError() {
    alert("Sorry The Map Can't Be Loaded Please Refresh The Page");
}
