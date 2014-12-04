/**
 * Created by Bart on 29/11/2014.
 */

var Point = require("../myModules/data/dataPointModel");



var chatModule = function(){
    
    var socketInit = function(app,io){
        io.on('connection', function(socket){
            socket.on('chat message', function(msg){
                io.emit('chat message', msg);
            });

            socket.on('points', function(socket){



                    Point.find(function(err,pointz){
                        io.emit('points',pointz);
                    });




            });





        });
        }




    return{
        ioChat:socketInit
    }

}();

module.exports = chatModule;