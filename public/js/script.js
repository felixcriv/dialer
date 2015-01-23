var socket = io();

var send = document.getElementById('send');
var phoneNumber = document.getElementById('phoneNumber');
var list = document.getElementById('list');
var listBody = document.getElementById('listBody');

var keepTimers = [];

var eventHandler = {

    buttonClick: function buttonClick(e) {

        if (e.type === 'click' && phoneNumber.value) {
            socket.emit('dial', formatLocal("US", phoneNumber.value));
            phoneNumber.value = '';
        }

        if (e.type === 'keypress' && e.target.value) {
            socket.emit('dial', formatLocal("US", e.target.value));
            e.target.value = "";
        }
    },

    enterKey: function enterKey(e) {

        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;

        if (keyCode == '13') {
            this.buttonClick(e);
        }
    },

};

phoneNumber.onkeypress = eventHandler.enterKey.bind(eventHandler);

send.addEventListener('click', eventHandler.buttonClick, false);

socket.on('dial', function(msg) {
    var tr = document.createElement('tr');
    var created = moment();

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');

    var span = document.createElement('span');
    span.innerHTML = '<a href="tel:' + msg.phone + '">' + msg.phone + '</a>';

    td1.appendChild(span);
    td2.appendChild(document.createTextNode(msg.state.toUpperCase()));
    td3.appendChild(document.createTextNode(moment().format("h:mm a")));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    setInterval(function() {
        td4.innerHTML = moment().from(created, true) + " ago"
    }, 1000);

    tr.appendChild(td4);

    listBody.appendChild(tr);
});