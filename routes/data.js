var express = require('express');
var router = express.Router();
var url = require('url');
var dataAccess = require("../myModules/dataAccessor.js");

/* GET users listing. */

router.get('/', function(req, res) {
  res.send('');
});

router.get('/setPoint',function(req, res){

  //json sucks clean and slice helps to make it parsable.
  //men clean functie toevoegen aan men module en daar doen controller is niet de correcte plaats
  //niet vergeten
  var alertPointObj =JSON.parse(clean(JSON.stringify(req.query)).slice(2,-5));

  //within this module there needs to be checked if the user is logged in and is valid the userID needs to be stored aswell
  //frontend only display report panel when user logs in
  dataAccess.addPoint(alertPointObj);
  res.end("Point has been added.");
});


module.exports = router;



function clean(json) {

  json = json.replace(/\\/g, '');

  //json = json.substring(1, json.length - 1);
  //json = json.replace(/\\\'/g, '');
  return json;

}