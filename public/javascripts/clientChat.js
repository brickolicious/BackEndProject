/**
 * Created by Bart on 29/11/2014.
 */
var socket = io();
$('#chatForm').submit(function(){
    //alert("bla");
    socket.emit('chat message', $('#sendMessage').val());
    $('#sendMessage').val('');


    e.preventDefault();
    return false;
});

socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});
