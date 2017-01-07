document.getElementById('pitch-control').addEventListener('input', (e) => {
    map.easeTo({
        pitch: Math.max(e.target.valueAsNumber || 0, 0)
    })
})

document.getElementById('bearing-control').addEventListener('input', (e) => {
    map.easeTo({
        bearing: Math.max(e.target.valueAsNumber || 0, 0)
    })
})
document.getElementById('toggle-info').addEventListener('click', (e) => {
    document.getElementById('info').classList.toggle('hidden')
})

var layerList = document.getElementById('mapstyles');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

// map.addControl(new MapboxDirections({
//     accessToken: mapboxgl.accessToken
// }), 'top-left');

// var draw = new MapboxDraw({
//     displayControlsDefault: false,
//     controls: {
//         polygon: true,
//         trash: true
//     }
// });
// map.addControl(draw);

// map.addControl(new GeolocateControl({
// }), 'bottom-right');

document.getElementById('start-recording').addEventListener('click', function (e) {
    const canvas = document.getElementsByTagName('canvas')[0]
    const recorder = RecordRTC(canvas, {
        type: 'canvas',
        showMousePointer: true,
        mimeType: 'video/mp4'
    });

    recorder.startRecording();

    const stopButton = document.createElement('button')
    stopButton.id = 'stop-recording'
    stopButton.innerText = 'Stop Recording'
    stopButton.classList.add('pure-button', 'button-error')
    stopButton.addEventListener('click', function (e) {
        recorder.stopRecording(function (url) {

            const blob = recorder.getBlob();
            let src = URL.createObjectURL(blob)
            const video = document.createElement('video');
            video.src = src;
            video.setAttribute('style', 'height: auto; width: 100%');
            document.querySelector('#rendered-video').appendChild(video);
            video.controls = true;
            video.play();

            const downloadButton = document.createElement('a')
            downloadButton.innerText = "Download Video"
            downloadButton.download = 'video.mp4'
            downloadButton.href = src;
            downloadButton.classList.add('pure-button', 'pure-button-primary')
            downloadButton.addEventListener('click', function(e) {
                video.parentNode.removeChild(video);
                stopButton.parentNode.removeChild(stopButton);
                downloadButton.parentNode.removeChild(downloadButton);
            })
            document.querySelector('#video-controls').appendChild(downloadButton);

        });
    })

    document.querySelector('#video-controls').appendChild(stopButton);


});
