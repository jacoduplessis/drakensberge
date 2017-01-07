mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2R1cGxlc3NpcyIsImEiOiJjaXd2em9yMDEwMDJ6Mm9wZnhyZWRxb2ZtIn0.F5oB5GybtL-ao_UUZw4Mxg';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [25, -27], // starting position
    zoom: 3 // starting zoom
});

