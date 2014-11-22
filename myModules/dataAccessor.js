var dataAccesor = function(){

    addPoint = function(json){
        //console.log(json);
        var pointToAdd = JSON.parse(clean(JSON.stringify(json)).slice(2,-5));
        console.log("Add point: "+pointToAdd.alertType);

    },

    getAllPointsAroundLocation = function(coordinates){
        console.log("Get points around: "+coordinates);

    }


    return{
        "addPoint":addPoint,
        "getPointsAround":getAllPointsAroundLocation
    };

}();


module.exports = dataAccesor;



function clean(json) {

    json = json.replace(/\\/g, '');

    return json;

}