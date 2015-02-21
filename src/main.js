;(function() {
    'use strict';

    var evnt = require('./eventHandlerDetector');
    var tbEntry = require('./createTableEntry');

    var socket = io(),
        sendButton = document.getElementById('send'),
        phoneNumberInput = document.getElementById('phoneNumber'),
        list = document.getElementById('list'),
        listBody = document.getElementById('listBody');

    var eventHandler = {

        buttonClick: function buttonClick(e) {
           
            var target = evnt.eventHandlerDetector(phoneNumberInput, e);

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
        tbEntry.createTableEntry(msg);
    });

})();