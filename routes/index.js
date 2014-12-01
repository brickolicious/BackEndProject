var express = require('express');
var router = express.Router();
var dataAccess = require("../myModules/dataAccessor.js");
var passport = require('passport');
var Account = require('../myModules/data/account');

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

  dataAccess.addPoint(req,function(){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Point added');
  });
});

module.exports = router;
