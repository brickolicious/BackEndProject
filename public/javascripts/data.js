
initData();

function initData() {

    coupleListenersToAlertButtons();
    //makeMarkersOutOfJSON();

};



function coupleListenersToAlertButtons(){
    var buttons = document.getElementById("sideMenu").getElementsByTagName("button");

    for (var i = 0; i < buttons.length - 1; i++) {

        buttons[i].addEventListener("click", function (e) {
            //console.log("value: "+this.value);
            var alertObj = {
                "alertType": this.value,
                "latLng": currentLatLng
            };


            //set point - send point data to server
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/setPoint",
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
                //var myLittleSocket = io();
                //myLittleSocket.emit("points",function(data){makeMarkersOutOfJSON(data);});

            });


        });

    }
}
