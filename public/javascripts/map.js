var geocoder = new google.maps.Geocoder();

function geocodePosition(pos) {
    geocoder.geocode({
        latLng: pos
    }, function(responses) {
        if (responses && responses.length > 0) {
            updateMarkerAddress(responses[0].formatted_address);
        } else {
            updateMarkerAddress('Cannot determine address at this location.');
        }
    });
}

function updateMarkerStatus(str) {
    document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(latLng) {
    document.getElementById('info').innerHTML = [
        latLng.lat(),
        latLng.lng()
    ].join(', ');
}

function updateMarkerAddress(str) {
    document.getElementById('address').innerHTML = str;
}

function initialize() {
    console.log("In initialize maps function");



    var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 14
    };

    //options for geolocation
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

        //set marker and update info where marker is set
        var latLng = new google.maps.LatLng(crd.latitude, crd.longitude);
        dragAndDrop(map,latLng);

    };

    function error(err) {
        console.log('Geolocation failed');
        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

        var latLng = new google.maps.LatLng(mapOptions.center.lat, mapOptions.center.lng);
        dragAndDrop(map,latLng);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);


    //deals with the drag and dropping of the marker
    //also calls function to update frontend info
    function dragAndDrop(map,latLng){



        var marker = new google.maps.Marker({
            position: latLng,
            title: 'My location',
            map: map,
            draggable: true,
            icon: pinSymbol("#5bc0de")
        });

        // Update current position info.
        updateMarkerPosition(latLng);
        geocodePosition(latLng);

        // Add dragging event listeners.
        google.maps.event.addListener(marker, 'dragstart', function() {
            updateMarkerAddress('Dragging...');
        });

        google.maps.event.addListener(marker, 'drag', function() {
            //updateMarkerStatus('Dragging...');
            updateMarkerPosition(marker.getPosition());
        });

        google.maps.event.addListener(marker, 'dragend', function() {
            //updateMarkerStatus('Drag ended');
            geocodePosition(marker.getPosition());
        });


    }

    function pinSymbol(color) {
        return {
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
            fillColor: color,
            fillOpacity:1,
            /*strokeColor:'#000',
            strokeWeight: 2,*/
            scale:1
            };
    }

}


google.maps.event.addDomListener(window, 'load', initialize);