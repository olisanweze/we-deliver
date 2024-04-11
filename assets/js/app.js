/*=======================================================*/
/*                                                       */
/*  Olisa Nweze (2024)                                   */
/*  github.com/olisanweze                                */
/*                                                       */
/*=======================================================*/

'use strict';
import { select, listen } from './utils.js';

/*=======================================================*/
/*  Organizer                                            */
/*=======================================================*/

const track = select('.track-button');
const placeholder = select('.map-placeholder');

//  The 'success' callback function
function getLocation(position) {
  const { latitude, longitude } = position.coords;

  mapBuild(longitude, latitude);
}

//  The 'error/failure' callback function
function errorHandler() {
  placeholder.innerText = 'Unable to retrieve user location';
}

const options = {
  enableHighAccuracy: true
}

mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpc2Fud2V6ZSIsImEiOiJjbHV1aWhmcWQwYWsxMnFvdjE2aHFsa3ZjIn0.gyU5LVBd-DSepVIOzD1LTA';

function mapBuild(longitude, latitude) {
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [longitude, latitude], // starting position [lng, lat]
  zoom: 15, // starting zoom
  });

  const marker1 = new mapboxgl.Marker({color: '#1e90ff'})
  .setLngLat([longitude, latitude])
  .addTo(map);
}

function genMap() {
  if ('geolocation' in navigator) {
    placeholder.innerText = 'Please wait while we load your location';
    navigator.geolocation.getCurrentPosition(
      getLocation, errorHandler, options
    );
  } else {
    placeholder.innerText = 'Geolocation is not supported by your browser';
  }
}

listen('click', track, genMap);