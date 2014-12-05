/**
 * Created by Bart on 29/11/2014.
 */

var socket = io();

var chatForm = document.getElementById('chatForm');
if(chatForm != null && chatForm != undefined) {
    chatForm.addEventListener('submit', function (e) {
        //alert("bla");
        e.preventDefault();
        socket.emit('chat message', document.getElementById("userName").innerHTML+": "+ document.getElementById('sendMessage').value);
        document.getElementById('sendMessage').value = '';



        return false;
    });

    socket.on('chat message', function(msg){

        var litje = document.createElement('li');
        litje.innerHTML = msg;
        document.getElementById('messages').appendChild(litje);
    });
}




