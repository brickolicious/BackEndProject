function initialize() {
    console.log("In initialize maps function");



    var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 14
    };





    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {

        var crd = pos.coords;

        mapOptions.center.lat = crd.latitude;
        mapOptions.center.lng = crd.longitude;
        console.log("geolocation succes: lat->"+mapOptions.center.lat+" long->"+mapOptions.center.lng);
        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

    };

    function error(err) {
        console.log('Geolocation failed');
        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    };

    navigator.geolocation.getCurrentPosition(success, error, options)




}


google.maps.event.addDomListener(window, 'load', initialize);