var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../myModules/data/account');
var Point = require('../myModules/data/dataPointModel');
var serverIP;
var ifaces=require('os').networkInterfaces();
for (var dev in ifaces) {
  var alias=0;
  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4' && details.address != "127.0.0.1") {
      serverIP = details.address;
    }
  });
}

/* GET home page. */
router.get('/',function(req, res) {

  res.render('index', {user: req.user,srvIP:serverIP});

});

router.post('/login',passport.authenticate('local'),function(req,res){

  if(req.isAuthenticated()){
    res.render('index',{user:req.user});
  }else{
    res.render('index',{user:req.user/*,srvIP:serverIP*/});

  }

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
