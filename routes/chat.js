/**
 * Created by Bart on 29/11/2014.
 */

var chatModule = function(){

    var socketInit = function(app,io){
        io.on('connection', function(socket){
            socket.on('chat message', function(msg){
                io.emit('chat message', msg);
            });
        });
    }

    return{
        ioChat:socketInit
    }

}();

module.exports = chatModule;