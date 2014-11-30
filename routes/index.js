var express = require('express');
var router = express.Router();
var dataAccess = require("../myModules/dataAccessor.js");

var passport = require('passport');
var Account = require('../myModules/account');


/* GET home page. */
router.get('/',function(req, res) {

      res.render('index',{user:req.user});

    });




//zou hier moeten auth en een session aanmaken en dan doorverwijzen naar home die dan wel een user object zou moeten hebben
router.post('/login',passport.authenticate('local'),function(req,res){

console.log("Inside login post:"+req.body.username+" "+req.body.password);

res.redirect('/');

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


router.post('/setPoint'/*,passport.authenticate('local')*/,function(req, res){

  if(req.isAuthenticated){

    //user email of userID nog meegeven om te melding te koppelen aan account
    //datum ook mee opslaan
    dataAccess.addPoint(req.body,function(){
      res.end('Point has been reported.');
    });


  }

});


module.exports = router;
