var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var app = express();
var routes = require('./routes/index');
/*var pointData = require('./routes/data');*/

var passport = require('passport');
var passportLocal = require('passport-local');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//de express session middle ware heeft een sectret nodig zodat het de cookies met het session id kan beveiligen
//nu wordt er gezegt van je krijgt de session secret vie console toegestuurd indien niet dan neem je mylittlesecret
app.use(expressSession({secret: process.env.SESSION_SECRET || 'mylittlesecret',
    resave:false,
    saveUninitialized:false
}));


//passport middleware for local auth
//passport als laatste aanspreken
app.use(passport.initialize());
app.use(passport.session());



app.use('/', routes);
/*app.use('/data', pointData);*/





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port + '\n');
});





module.exports = app;


