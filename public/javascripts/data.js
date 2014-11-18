
initData();

function initData() {

    coupleListenersToAlertButtons();
    getAllPointsForInitialPosition();

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
                type: "get",
                url: "http://localhost:8080/data/setPoint",
                /*crossDomain:true,
                 dataType: "json",
                 contentType: "application/json; charset=UTF-8",*/
                data: JSON.stringify(alertObj)
            }).done(function (data) {
                //console.log("ajax callback response:" + data);
                alert(data);

            });


        });

    }
}

function getAllPointsForLocation(){
    //haal punten op voor currentLatLng indien deze verandered
    //maar hoe aanroepen hier wnr map file eerst ingelezen wordt
}