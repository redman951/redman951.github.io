const
  cafeMarks = [[48.213818, 16.359067]];

ymaps.ready(init);
function init(){

	  map = new ymaps.Map("Yandex_Map",
			{
	      center: cafeMarks[0],
	      zoom: 17,
        controls: ['routeButtonControl']
	  	},
      {
        searchControlProvider: 'yandex#search',
        balloonPanelMaxMapArea: 0
      }
		);

    for(let i = 0; i < cafeMarks.length; ++i) {
      let
        balloonHeader = '<a href="cafe-votiv.at">Cafe Votiv</a><br>'
          +'Dies ist ein unbestätigter Eintrag.',
        balloonBody = 'Reichsratsstraße 17<br>'
          +'1010 Wien<br>'
          +'01 4065913<br>'
          +'<a href="cafe-votiv.at">cafe-votiv.at <br> 4 Berichte</a>',
        lat_lon = cafeMarks[i];
        userLatLon=[0,0],
        routeUrl=`https://yandex.ru/maps/10371/vienna/?ll=${lat_lon[1]}`
          +`%2C${lat_lon[0]}&mode=routes&rtext=${lat_lon[0]}%2C${lat_lon[1]}&rtt=auto&z=14`,
        balloonFooter = `<span class="Map_Link" onclick="setRouteTo(${i})">Routeplanner</a>`+' | '
          +'<a href="/">in der nähe suchen</a>'+' | '
          +'<a href="/">Mehr</a>';

			mark = new ymaps.Placemark(lat_lon,
        {
            balloonContentHeader: balloonHeader,
            balloonContentBody: balloonBody,
            balloonContentFooter: balloonFooter
        }, {
            preset: 'islands#redFoodIcon'
        }
      );
      setAddress(mark, lat_lon);
			map.geoObjects.add(mark);
		}

    function setAddress(placemark, coords) {
        placemark.properties.set('balloonBody', 'Reichsratsstraße 17<br>'
          +'1010 Wien<br>'
          +'01 4065913<br>'
          +'<a href="cafe-votiv.at">cafe-votiv.at <br> 4 Berichte</a>');

        ymaps.geocode(coords).then(function (res) {
            var geoObject = res.geoObjects.get(0);

            addressLine = geoObject.getAddressLine();

            placemark.properties.set({
                    // Формируем строку с данными об объекте.
                    balloonContentBody: `${addressLine}<br>`
                      +'<a href="http://cafe-votiv.at">cafe-votiv.at <br> 4 Berichte</a>'
                });
        });
    }
}

function setRouteTo(placemarkIndex) {
  let
    routeControl = map.controls.get('routePanelControl');
  if (!routeControl) {
    routeControl = new ymaps.control.RoutePanel();
      map.controls.add(routeControl);
  }
  routeControl.routePanel.state.set({
      from: '',
      to: cafeMarks[placemarkIndex]
  });
}
