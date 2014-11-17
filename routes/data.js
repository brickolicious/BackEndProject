var express = require('express');
var router = express.Router();
var url = require('url');

/* GET users listing. */

router.get('/', function(req, res) {
  res.send('');
});

router.get('/setPoint',function(req, res){

  //json that was stringigied sucks clean and slice helps to make it parsable
  var alertPointObj =JSON.parse(clean(JSON.stringify(req.query)).slice(2,-5));
  console.log("ajax data: lat:"+alertPointObj.latLng.k+", lng:"+alertPointObj.latLng.B);

  //create module that will add this data to the database
  //within this module there needs to be checked if the user is logged in and is valid the userID needs to be stored aswell
  //frontend only display report panel when user logs in

});


module.exports = router;



function clean(json) {

  json = json.replace(/\\/g, '');

  //json = json.substring(1, json.length - 1);
  //json = json.replace(/\\\'/g, '');
  return json;

}