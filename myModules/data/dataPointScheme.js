/**
 * Created by Bart on 4/12/2014.
 */


var mongoose = require('mongoose');

var PointSchema = new mongoose.Schema({
    Lat:Number,
    Long:Number,
    Type:String,
    EntryDate:Date
});

module.exports = PointSchema;