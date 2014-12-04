/**
 * Created by Bart on 4/12/2014.
 */

var mongoose = require('mongoose');
var pointSchema = require('./dataPointScheme');




var Point = mongoose.model('Point',pointSchema,"Points");


module.exports = Point;