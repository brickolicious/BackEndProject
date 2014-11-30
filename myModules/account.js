/**
 * Created by Bart on 30/11/2014.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    bcrypt = require('bcrypt-nodejs');

var Account = new Schema({
    username: String,
    password: String,
    email: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
