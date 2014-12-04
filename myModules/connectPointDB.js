/**
 * Created by Bart on 4/12/2014.
 */

var mongoose = require("mongoose");

module.exports = (function () {
    var mongodbURL = 'mongodb://localhost/Points';
    //voor 2de db aan te spreken createConnection gebruiken

    var db = mongoose.createConnection(mongodbURL); //async connectie aanmaken

    mongoose.connection.on("error", function (error) {
        console.log(error);
    });


    mongoose.connection.on("open", function () {
        console.log("connection met mongo server " + mongodbURL);

        // get collection (table) names
        /*mongoose.connection.db.collectionNames(function (err, names) {
            console.log("collection list:");
            console.log(names);
        });*/

    });

    return { db: db }

})();

