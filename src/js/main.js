;
(function() {
    'use strict';

    var _evnt = require('./eventHandlerDetector');
    var _notification = require('./notificationPermission');
    var _phoneNumber = require('./phoneNumber');
    var _data = require('./dataSync');

    var sendButton = document.getElementById('send'),
        phoneNumberInput = document.getElementById('phoneNumber'),
        list = document.getElementById('list'),
        listBody = document.getElementById('listBody');

        alertify.warning('Remember to level up your speakers to listen alerts');
    _notification.checkNotificationPermission();

    var eventHandler = {

        buttonClick: function buttonClick(e) {

            var target = _evnt.eventHandlerDetector(phoneNumberInput, e);
            var phone = target.value;
            var phoneWithAreaCode = _phoneNumber.numberWithAreaCode(phone);
            var areaCodes = _phoneNumber.areaCode();

            if (_phoneNumber.isTollFreeNumber(phone) > -1) {

                _data.save(phoneWithAreaCode, 'Toll-Free', 1, false);

            } else if (_phoneNumber.isValid(phone)) {

                areaCodes.get('+1' + phoneWithAreaCode, function(err, data) {
                    if (!err) {
                        _data.save(phoneWithAreaCode, data.state, 1, false)
                    }
                });

            } else {
                alert('Invalid phone number');
            }

            target.value = "";
            return false;
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