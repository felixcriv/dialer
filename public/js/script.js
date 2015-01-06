var socket = io();

var send = document.getElementById('send');
var phoneNumber = document.getElementById('phoneNumber');
var list = document.getElementById('list');
var listBody = document.getElementById('listBody');

var eventHandler = {

  buttonClick: function(evnt){
    socket.emit('dial', phoneNumber.value);
    phoneNumber.value = "";
  }
},

handler = eventHandler.buttonClick.bind(eventHandler);

send.addEventListener('click', handler, false);

socket.on('dial', function(msg){
  var tr = document.createElement('tr');
  var td1=document.createElement('td');
  var td2=document.createElement('td');
  var td3=document.createElement('td');

  var span = document.createElement('span');
  span.innerHTML = '<a href="tel:' + msg.phone + '">' + msg.phone + '</a>';


  td1.appendChild(span);
  td2.appendChild(document.createTextNode( msg.state.toUpperCase() ));
  td3.appendChild(document.createTextNode( moment().format("h:mm a")));

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);

  listBody.appendChild(tr);
});