var framesPerSecond = 24;
var initialOpacity = 1
var opacity = initialOpacity;
var initialRadius = 8;
var radius = initialRadius;
var maxRadius = 18;

map.on('load', function () {

    // Add a source and layer displaying a point which will be animated in a circle.
    map.addSource('beacon', {
        "type": "geojson",
        "data": {
            "type": "Point",
            "coordinates": [18.645014542371996, -33.85030545296336]
        }
    });

    map.addLayer({
        "id": "beacon",
        "source": "beacon",
        "type": "circle",
        "paint": {
            "circle-radius": initialRadius,
            "circle-radius-transition": { duration: 0 },
            "circle-opacity-transition": { duration: 0 },
            "circle-color": "#007cbf"
        }
    });

    map.addLayer({
        "id": "beacon-core",
        "source": "beacon",
        "type": "circle",
        "paint": {
            "circle-radius": initialRadius,
            "circle-color": "#007cbf"
        }
    });


    function animateMarker(timestamp) {
        setTimeout(function () {
            requestAnimationFrame(animateMarker);

            radius += (maxRadius - radius) / framesPerSecond;
            opacity -= (.9 / framesPerSecond);

            map.setPaintProperty('beacon', 'circle-radius', radius);
            map.setPaintProperty('beacon', 'circle-opacity', Math.max(opacity, 0));

            if (opacity <= 0) {
                radius = initialRadius;
                opacity = initialOpacity;
            }

        }, 1000 / framesPerSecond);

    }

    // Start the animation.
    animateMarker(0);
});

function moveBeacon(coordinates) {
    map.getSource('beacon').setData({
        "type": "Point",
        "coordinates": coordinates
    });
}

function toggleBeaconVisibility() {
    var beaconLayer = 'beacon';
    var beaconCoreLayer = 'beacon-core'
    var visibility = map.getLayoutProperty(beaconLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(beaconLayer, 'visibility', 'none');
            map.setLayoutProperty(beaconCoreLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(beaconLayer, 'visibility', 'visible');
            map.setLayoutProperty(beaconCoreLayer, 'visibility', 'visible');
        }
}