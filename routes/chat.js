/**
 * Created by Bart on 29/11/2014.
 */
var domain = require('domain');
chatDomain = domain.create();
chatDomain.on('error', function (err) {
    console.log('Error with the sockets:', err);
});

chatDomain.run(function() {

    var Point = require("../myModules/data/dataPointModel");


    var chatModule = function () {

        var socketInit = function (app, io) {
            io.on('connection', function (socket) {

                socket.on('chat message', function (chatObj) {
                    io.emit('chat message', chatObj);
                });

                socket.on('points', function (socket) {

                    Point.find(function (err, pointz) {
                        io.emit('points', pointz);
                    });


                });

            });
        }


        return {
            ioChat: socketInit
        }

    }();

    module.exports = chatModule;

});