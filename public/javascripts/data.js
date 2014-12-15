
initData();

function initData() {

    coupleListenersToAlertButtons();
    //makeMarkersOutOfJSON();

};



function coupleListenersToAlertButtons(){
    var buttons = document.getElementById("sideMenu").getElementsByTagName("button");

    for (var i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("click", function (e) {
            //console.log("value: "+this.value);
            var alertObj = {
                "alertType": this.value,
                "latLng": {lat:currentLatLng.lat(),lng:currentLatLng.lng()}
            };

            //var serverIP = "http://"+nsGeo.serverIP+":8080/setPoint";
            var serverIP = "http://"+location.host+"/setPoint";
            //alert(serverIP);
            //set point - send point data to server
            $.ajax({
                type: "POST",
                url: serverIP,
                /*crossDomain:true,
                 dataType: "json",
                 contentType: "application/json; charset=UTF-8",*/
                data: JSON.stringify(alertObj)
            }).done(function (data) {
                //console.log("ajax callback response:" + data);
                var lepop = document.getElementById("lepop");
                lepop.innerHTML = data;
                lepop.classList.toggle("nopop");
                lepop.classList.toggle("popup");
                setTimeout(function(){
                    lepop.classList.toggle("nopop");
                    lepop.classList.toggle("popup");
                },1500);



                var myLittleSocket = io();
                myLittleSocket.emit("points",function(data){makeMarkersOutOfJSON(data);});
                socket.emit('points');
            });


        });

    }
}
