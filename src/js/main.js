;
(function() {
    'use strict';

    var evnt = require('./eventHandlerDetector');
    var tbEntry = require('./createTableEntry');
    var notification = require('./notificationPermission');
    var phoneNumber = require('./phoneNumber');

    var sendButton = document.getElementById('send'),
        phoneNumberInput = document.getElementById('phoneNumber'),
        list = document.getElementById('list'),
        listBody = document.getElementById('listBody');


    notification.checkNotificationPermission();

    var eventHandler = {

        buttonClick: function buttonClick(e) {

            var target = evnt.eventHandlerDetector(phoneNumberInput, e);
            var phone = target.value;
            var phoneWithAreaCode = phoneNumber.numberWithAreaCode(phone);
            var areaCodes = phoneNumber.areaCode();

            if (phoneNumber.isValid(phone)) {                

                var isTollFreeNumber = phoneNumber.isTollFreeNumber(phone);

                if ( isTollFreeNumber> -1) {
                    tbEntry.savePhone(phoneWithAreaCode, 'Toll-Free', 1);
                } else {
                    areaCodes.get('+1' + phoneWithAreaCode, function(err, data) {
                        if (!err) {
                            tbEntry.savePhone(phoneWithAreaCode, data.state, 1)
                        }
                    });
                }

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
        }
    };

    phoneNumberInput.onkeypress = eventHandler.enterKey.bind(eventHandler);
    sendButton.addEventListener('click', eventHandler.buttonClick.bind(eventHandler), false);

})();