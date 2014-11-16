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

    var map;
    var mymarker;

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
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

        //set marker and update info where marker is set
        var latLng = new google.maps.LatLng(crd.latitude, crd.longitude);
        dragAndDrop(map,latLng);
        searchAutoComplete();
    };

    function error(err) {
        console.log('Geolocation failed');
        map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

        var latLng = new google.maps.LatLng(mapOptions.center.lat, mapOptions.center.lng);
        dragAndDrop(map,latLng);
        searchAutoComplete();
    };

    navigator.geolocation.getCurrentPosition(success, error, options);


    //deals with the drag and dropping of the marker
    //also calls function to update frontend info
    function dragAndDrop(map,latLng){



        mymarker = new google.maps.Marker({
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
        google.maps.event.addListener(mymarker, 'dragstart', function() {
            updateMarkerAddress('Dragging...');
        });

        google.maps.event.addListener(mymarker, 'drag', function() {
            //updateMarkerStatus('Dragging...');
            updateMarkerPosition(mymarker.getPosition());
        });

        google.maps.event.addListener(mymarker, 'dragend', function() {
            //updateMarkerStatus('Drag ended');
            geocodePosition(mymarker.getPosition());
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

    function searchAutoComplete(){

        var input = /** @type {HTMLInputElement} */(
            document.getElementById('pac-input'));

        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();

        var marker = mymarker;
       /*var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });*/

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }

            /*marker.setIcon(({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));*/
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindow.open(map, marker);



            console.log("latlong:"+marker.position.lat+", "+marker.position.lng);
            var latlngPos = new google.maps.LatLng(marker.position.lat(),marker.position.lng());
            updateMarkerPosition(latlngPos);
            geocodePosition(latlngPos);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
            var radioButton = document.getElementById(id);
            google.maps.event.addDomListener(radioButton, 'click', function() {
                autocomplete.setTypes(types);
            });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);



    }


}


google.maps.event.addDomListener(window, 'load', initialize);