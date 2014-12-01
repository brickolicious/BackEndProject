var dataAccessor = function(){

    addPoint = function(req){
        //console.log(json);
        var json = req.body;
        var pointToAdd = JSON.parse(clean(JSON.stringify(json)).slice(2,-5));
        console.log("Add point: "+pointToAdd.alertType);

        //gives code 500
        var connectPoints = require('./data/connectToPoints');



    },

    getAllPointsAroundLocation = function(coordinates){
        console.log("Get points around: "+coordinates);

    },

    registerNewUser = function(formBody){

        //console.log(formBody.username+"  "+formBody.password+"  "+formBody.email);

    },

    sendForgottenPasswordToUser = function(formBody){
        console.log("Send password to: "+formBody.email);


    }


    return{
        "addPoint":addPoint,
        "getPointsAround":getAllPointsAroundLocation,
        "forgottenUser":sendForgottenPasswordToUser
    };



}();


module.exports = dataAccessor;

function clean(json) {

    json = json.replace(/\\/g, '');

    return json;

}