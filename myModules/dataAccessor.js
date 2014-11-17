var dataAccesor = function(){

    addPoint = function(json){
        console.log("Add point: "+json.alertType);

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