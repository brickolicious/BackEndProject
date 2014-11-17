
var buttons = document.getElementById("sideMenu").getElementsByTagName("button");

for(var i=0;i<buttons.length-1;i++){

    buttons[i].addEventListener("click",function(e){
        //console.log("value: "+this.value);
        var alertObj = {
            "alertType": this.value,
            "latLng":currentLatLng
        };
        //console.log("bij klik stuur dit object: "+alertObj.alertType+", "+currentLatLng.lat);
        /*$.ajax({
            dataType: "json",
            url: "http://localhost:8080/data/setPoint",
            data: JSON.stringify(alertObj),
            success: function (jsonObj) {
                /*items = jsonObj.items;
                console.log(items);*/
          /*      console.log(jsonObj);
            }

        });*/


        $.ajax({
            type: "get",
            url: "http://localhost:8080/data/setPoint",
            /*crossDomain:true,
            dataType: "json",
            contentType: "application/json; charset=UTF-8",*/
            data:  JSON.stringify(alertObj)
        }).done(function ( data ) {
            //console.log("ajax callback response:" + data);
            alert(data);

        });




    });

}