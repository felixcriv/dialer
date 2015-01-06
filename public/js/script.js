var socket = io();

var send = document.getElementById('send');
var phoneNumber = document.getElementById('phoneNumber');
var list = document.getElementById('list');

var eventHandler = {

  buttonClick: function(evnt){
    socket.emit('dial', phoneNumber.value);
    phoneNumber.value = "";
  }
},

handler = eventHandler.buttonClick.bind(eventHandler);

send.addEventListener('click', handler, false);

socket.on('dial', function(msg){
  var li = document.createElement('li');
  var date = document.createElement('span');
  date.innerHTML = moment().format("h:mm a");

  li.innerHTML = '<a href="tel:' + msg.phone + '">' + msg.phone + '</a><span>' + msg.state.toUpperCase() + ', ' + date.innerHTML + '</span>'; 
  list.appendChild(li);
});