var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../myModules/data/account');

var Point = require('../myModules/data/dataPointModel');
//var connectDB = require("../myModules/connectPointDB");


/* GET home page. */
router.get('/',function(req, res) {

      res.render('index',{user:req.user});
    });

router.post('/login',passport.authenticate('local'),function(req,res){

res.render('index',{user:req.user});
});


router.post('/register',function(req,res){

  Account.register(new Account({ username : req.body.username, email : req.body.email }), req.body.password, function(err, account) {
    if (err) {
      return res.render("register", {info: "Sorry. That username already exists. Try again."});
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });

});

router.post('/forgot',function(req,res){

  dataAccess.forgottenUser(req.body);

  res.redirect('/');

});

router.post('/setPoint',function(req, res){

  var pointToAdd = JSON.parse(clean(JSON.stringify(req.body)).slice(2,-5));
  var newPoint = new Point({ Lat:pointToAdd.latLng.lat, Long:pointToAdd.latLng.lng, Type:pointToAdd.alertType,EntryDate:Date.now() });
  newPoint.save();
  res.end("Point has been added.");

});


function clean(json) {

  json = json.replace(/\\/g, '');

  return json;

}


module.exports = router;
