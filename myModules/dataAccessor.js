var dataAccesor = function(){

    addPoint = function(json){
        //console.log(json);
        var pointToAdd = JSON.parse(clean(JSON.stringify(json)).slice(2,-5));
        console.log("Add point: "+pointToAdd.alertType);

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
        "registerUser":registerNewUser,
        "forgottenUser":sendForgottenPasswordToUser
    };



}();


module.exports = dataAccesor;



function clean(json) {

    json = json.replace(/\\/g, '');

    return json;

}