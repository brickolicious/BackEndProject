var express = require('express');
var router = express.Router();
var dataAccess = require("../myModules/dataAccessor.js");

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(passport.initialize());
router.use(passport.session());

passport.use(new passportLocal.Strategy(function(username,password,done){

  //hier aanpassen en checkin in mongo gebruik makevan hashes met de crypto module
  if(username === username){
    done(null,{id:username,name:username});
  }else{
    done(null,null);
  }
  /*
  done(new Error('auth error!'));*/
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id,done){
  //query the db or cache here
  done(null, {id:id,name:id});
});




/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {

    isAuthenticated:req.isAuthenticated(),
    user:req.user

  });
});

router.post('/',passport.authenticate('local'),function(req,res){

res.redirect('/');

});


router.post('/setPoint',function(req, res){

  if(req.isAuthenticated){

    dataAccess.addPoint(req.body,function(){
      res.end('Point has been reported.');
    });


  }

});


module.exports = router;
