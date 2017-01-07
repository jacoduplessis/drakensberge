const locations = [
  {title: 'Durbanville', slug: 'db', lngLat: [18.645014542371996, -33.85030545296336]},
  {title: 'Kuilsrivier', slug: 'kr', lngLat: [18.688666709725425, -33.92217961789725]},
  {title: 'Orania', slug: 'or', lngLat: [24.40996151308903, -29.81435746060437]},
  {title: 'Vanderkloof', slug: 'vdk', lngLat: [24.731692538983026, -29.991703426725437]},
  {title: 'Clarens', slug: 'clr', lngLat: [28.421373229552472, -28.51445665293594]},
  {title: 'Kiara Lodge', slug: 'kiara', lngLat: [28.56263104311526, -28.508425382397114]},
  {title: 'Golden Gate', slug: 'gg', lngLat: [28.610212403661393, -28.503616597842232]},
  {title: 'Grotte', slug: 'grotte', lngLat: [28.458553200196008, -28.577986597717178]},
  {title: 'Mahai', slug: 'mahai', lngLat: [28.94653324746082, -28.690303054442772]},
  {title: 'Amphitheatre Backpackers', slug: 'amphi', lngLat: [29.159346338026012, -28.644393101594666]},
  {title: 'Lesotho', slug: 'les', lngLat: [28.653945576584874, -28.579038231894422]},
  {title: 'Mont Aux Sources', slug: 'mas', lngLat: [28.89107102391688, -28.727400424436063]},
  {title: 'Sani Backpackers', slug: 'sani', lngLat: [29.455658736558092, -29.6621668475018]},
  {title: 'Waterval Farm', slug: 'wtr', lngLat: [24.783210765004384, -32.19594611053046]},
  {title: 'Spandoukop', slug: 'spa', lngLat: [24.52204497105072, -32.28802088458813]}
]

const hikes = [
  {slug: 'kiara-1', title: 'Kiara 1'},
  {slug: 'kiara-2', title: 'Kiara 2'},
  {slug: 'wodehouse', title: 'Wodehouse'},
  {slug: 'ribbok', title: 'Ribbok'},
  {slug: 'grotte', title: 'Columbia Grotte'},
  {slug: 'natal', title: 'Rotal Natal Tiger Falls'},
  {slug: 'gorge', title: 'Royal Natal Tugela Gorge'},
  {slug: 'mont', title: 'Mont Aux Sources'},
  {slug: 'spandou', title: 'Spandoukop'}
]


const locationDiv = document.getElementById('locations');
locations.forEach(function (location, ix) {
  const btn = document.createElement('button')

  btn.textContent = location.title
  btn.classList.add('fly-to-location', 'pure-button')
  btn.id = `location-${ix}`

  btn.addEventListener('click', function (e) {
    document.getElementById('current').innerText = location.title
    moveBeacon(location.lngLat)
    map.flyTo({
      center: location.lngLat,
      speed: 0.7,
      zoom: 15,
      pitch: 60
    })
  })
  locationDiv.appendChild(btn)
  console.log(`Added location: ${location.title} ${location.lngLat}`)
});

document.getElementById('play-all').addEventListener('click', function () {
  let counter = 0;
  document.querySelector(`#location-0`).click()
  const interval = setInterval(function () {
    counter++;
    const locationElement = document.querySelector(`#location-${counter}`)
    locationElement.click()
    if (counter >= locations.length) clearInterval(interval);
  }, 10 * 1000);

})


hikes.forEach(function (hike) {
  btn = document.createElement('button')
  btn.innerText = hike.title
  btn.classList.add('pure-button')

  btn.addEventListener('click', function (e) {
    map.addSource(hike.slug, {
      type: 'geojson',
      data: `/hikes/${hike.slug}.geojson`
    })
    map.addLayer({
      id: hike.slug,
      type: 'line',
      source: hike.slug,
      paint: {
        "line-width": 5
      }
    }, 'beacon');

  })
  document.querySelector('#hikes').appendChild(btn)
})

document.getElementById('fit-to-sa').addEventListener('click', function () {
  map.setBearing(0);
  map.setPitch(0);
  map.fitBounds([
    [16.1, -34.8],
    [33.4, -21.8]
  ]);
});

document.getElementById('drive-to-orania').addEventListener('click', function () {

  if (!map.getSource('cpt-to-orania')) addCptOraniaRoute();

  const routePoints = map.getSource('cpt-to-orania')._data.geometry.coordinates;

  routeCounter = 0;
  numRoutePoints = routePoints.length;
  interval = setInterval(function () {
    moveBeacon(routePoints[routeCounter]);
    routeCounter++;
    if (routeCounter >= routePoints.length) window.clearInterval(interval);
  }, 300);

  map.flyTo({
    center: [24.40996151308903, -29.81435746060437],
    speed: 0.5,
    bearing: 185,
    curve: 2,
    zoom: 17.5
  });

});

function addCptOraniaRoute() {
  map.addSource("cpt-to-orania", {
    "type": "geojson",
    "data": {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            18.688675,
            -33.922216
          ],
          [
            18.683084,
            -33.864037
          ],
          [
            18.725826,
            -33.838381
          ],
          [
            19.006793,
            -33.741731
          ],
          [
            19.255895,
            -33.704625
          ],
          [
            19.324273,
            -33.633925
          ],
          [
            19.507745,
            -33.615334
          ],
          [
            19.543801,
            -33.528707
          ],
          [
            19.685866,
            -33.478749
          ],
          [
            19.732724,
            -33.413737
          ],
          [
            19.923477,
            -33.400982
          ],
          [
            20.133683,
            -33.271259
          ],
          [
            21.570911,
            -33.093676
          ],
          [
            21.734192,
            -32.932184
          ],
          [
            21.943561,
            -32.859426
          ],
          [
            21.976951,
            -32.771096
          ],
          [
            22.14314,
            -32.625877
          ],
          [
            22.58378,
            -32.332832
          ],
          [
            22.847163,
            -32.207227
          ],
          [
            23.007235,
            -32.023617
          ],
          [
            23.083187,
            -31.884797
          ],
          [
            23.015916,
            -31.814417
          ],
          [
            23.100325,
            -31.638621
          ],
          [
            23.066311,
            -31.510655
          ],
          [
            23.121293,
            -31.415446
          ],
          [
            23.117929,
            -31.135981
          ],
          [
            23.190994,
            -30.976572
          ],
          [
            23.281487,
            -30.907878
          ],
          [
            23.508418,
            -30.585212
          ],
          [
            23.654372,
            -30.136884
          ],
          [
            23.67292,
            -29.941529
          ],
          [
            23.84411,
            -29.844715
          ],
          [
            24.093652,
            -29.621982
          ],
          [
            24.40996151308903,
            -29.81435746060437
          ]
        ]
      }
    }
  });

  map.addLayer({
    "id": "route",
    "type": "line",
    "source": "cpt-to-orania",
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": "#888",
      "line-width": 8
    }
  }, 'beacon');
}
