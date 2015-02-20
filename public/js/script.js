(function() {
    'use strict';

    var socket = io(),
        sendButton = document.getElementById('send'),
        phoneNumberInput = document.getElementById('phoneNumber'),
        list = document.getElementById('list'),
        listBody = document.getElementById('listBody');

    var eventHandler = {

        buttonClick: function buttonClick(e) {

            var target = (e.type === 'click') ? phoneNumberInput : e.target;

            if (this.isValid(target.value)) {

                socket.emit('dial', formatLocal("US", target.value));
                target.value = "";

                return false;
            }

            alert('Invalid phone number');
        },

        enterKey: function enterKey(e) {

            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;

            if (keyCode == '13') {
                this.buttonClick(e);
            }
        },

        isValid: function isValid(phone) {
            return isValidNumber(phone, "US");
        }
    };

    phoneNumberInput.onkeypress = eventHandler.enterKey.bind(eventHandler);
    sendButton.addEventListener('click', eventHandler.buttonClick.bind(eventHandler), false);

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
        td4.appendChild(document.createTextNode('a few seconds ago'));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        setInterval(function() {
            td4.innerHTML = moment().from(created, true) + " ago"
        }, 1000);

        listBody.appendChild(tr);
    });

})();