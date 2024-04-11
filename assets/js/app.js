/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*                                                       */
/*  Olisa Nweze (2024)                                   */
/*  github.com/olisanweze                                */
/*                                                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

'use strict';

import { select, listen } from './utils.js';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Organizer                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

const track = select('.track-button');
const placeholder = select('.map-placeholder');
const map = select('#map');

//  The 'success' callback function
function getLocation(position) {
  const { latitude, longitude } = position.coords;

  mapBuild(longitude, latitude);
}

//  The 'error/failure' callback function
function errorHandler() {
  mapBuild(0, 0);
}

const options = {
  enableHighAccuracy: true
}

mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpc2Fud2V6ZSIsImEiOiJjbHV1aWhmcWQwYWsxMnFvdjE2aHFsa3ZjIn0.gyU5LVBd-DSepVIOzD1LTA';

function mapBuild(longitude, latitude) {
  const map = new mapboxgl.Map({
  container: 'map', // container ID
  center: [longitude, latitude], // starting position [lng, lat]
  zoom: 10, // starting zoom
  });

  map.addControl(
    new MapboxDirections({
    accessToken: mapboxgl.accessToken
    }),
    'top-left'
  );
  const marker1 = new mapboxgl.Marker({color: '#ff7342'})
  .setLngLat([longitude, latitude])
  .addTo(map);
}

function genMap() {
  if ('geolocation' in navigator) {
    placeholder.innerText ='';
    navigator.geolocation.getCurrentPosition(
      getLocation, errorHandler, options
    );
  }

  placeholder.classList.add('none');
  map.classList.add('block');
}

listen('click', track, genMap);