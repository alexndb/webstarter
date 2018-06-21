export default () => {
  if (document.querySelectorAll('#map').length == 1) {
    ymaps.ready(function () {
      let myMap = new ymaps.Map('map', {
          center: [59.908935, 30.378624],
          zoom: 15,
        }, {searchControlProvider: 'yandex#search'}),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #fff; font-weight: bold;">$[properties.iconContent]</div>'),
        myPlacemarkWithContent = new ymaps.Placemark([59.908935, 30.378624],
          {
            hintContent: 'Санкт-Петербург, ул. Мельничная, д. 24',
            balloonContent: 'Санкт-Петербург, ул. Мельничная, д. 24'
          },
          {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'img/icons/ico-map-trigger.png',
            iconImageSize: [96, 128],
            iconImageOffset: [-43, -128],
            iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout
          });
      myMap.geoObjects.add(myPlacemarkWithContent);
      myMap.behaviors.disable('scrollZoom');
    });
  }
}