/**
 * Created by Bart on 30/11/2014.
 */
(function initConnection() {
    var mongoose = require("../../node_modules/mongoose/index");
    var mongodbURL = 'mongodb://localhost/pointsDB';

    var db = mongoose.connect(mongodbURL); //connecteer de database
    mongoose.connection.on("open", function () {
        console.log("connection met mongo server " + mongodbURL);
// get collection (=table) names als test
        mongoose.connection.db.collectionNames(function (err, names) {
            console.log("collection list:");
            console.log(names);
        });
    });
    mongoose.connection.on("error", function () { console.log("connection to points had an error.") });
    mongoose.connection.on("close", function () {console.log("connection to points db closed."); });

})();