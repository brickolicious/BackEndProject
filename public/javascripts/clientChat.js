/**
 * Created by Bart on 29/11/2014.
 */
//console.log(currentLatLng);


var socket = io();

var chatForm = document.getElementById('chatForm');
if(chatForm != null && chatForm != undefined) {
    chatForm.addEventListener('submit', function (e) {
        //alert("bla");
        //console.log("Emit this nsgeo"+nsGeo.location.lng());
        e.preventDefault();
        socket.emit('chat message',
            {
            Message:(document.getElementById("userName").innerHTML+": "+ document.getElementById('sendMessage').value),
            Location:{lat:nsGeo.location.lat(),lng:nsGeo.location.lng()}
            }
        );
        document.getElementById('sendMessage').value = '';



        return false;
    });

    socket.on('chat message', function(chatObj){
        //console.log(chatObj);

        var newLatLng = new google.maps.LatLng(chatObj.Location.lat,chatObj.Location.lng);
        //console.log(newLatLng);
        if(getDistance(nsGeo.location,newLatLng)<15000){
            //console.log("User within accepted distance");
            var liTje = document.createElement('li');
            liTje.innerHTML = chatObj.Message;
            document.getElementById('messages').appendChild(liTje);
        }
    });
}

var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};




