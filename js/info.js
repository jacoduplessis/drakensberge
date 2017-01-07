map.on('mousemove', function (e) {
  document.getElementById('info').innerHTML = `
        point: ${JSON.stringify(e.point)}
        lngLat: [${e.lngLat.lng}, ${e.lngLat.lat}]
        zoom: ${map.getZoom()}
        bearing: ${map.getBearing()} 
        pitch: ${map.getPitch()}`
});