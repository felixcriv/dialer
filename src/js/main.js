;
(function() {
    'use strict';

    var evnt = require('./eventHandlerDetector');
    var tbEntry = require('./createTableEntry');

    var AreaCodes = require('areacodes');


    var tollfree = ['800', '888', '877', '866', '855', '844'];
    var reg = new RegExp(/\+?(1)?\d{3}/);

    var sendButton = document.getElementById('send'),
        phoneNumberInput = document.getElementById('phoneNumber'),
        list = document.getElementById('list'),
        listBody = document.getElementById('listBody');

    var eventHandler = {

        buttonClick: function buttonClick(e) {

            var target = evnt.eventHandlerDetector(phoneNumberInput, e);

            if (this.isValid(target.value)) {

                var ph = formatLocal("US", target.value);

                var areaCode = reg.exec(formatLocal("US", target.value));

                if (tollfree.indexOf(areaCode[0]) > -1) {
                    tbEntry.savePhone(ph, 'Toll-Free', moment().toString());
                } else {
                    var areaCodes = new AreaCodes();

                    areaCodes.get('+1' + ph, function(err, data) {

                        if (!err) {
                            tbEntry.savePhone(ph, data.state, moment().toString())
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
        },

        isValid: function isValid(phone) {
            return isValidNumber(phone, "US");
        }
    };

    var loadStoredPhones = tbEntry.getSavedPhones(function(d,key) {
        tbEntry.createTR(d,key);
    });

    phoneNumberInput.onkeypress = eventHandler.enterKey.bind(eventHandler);
    sendButton.addEventListener('click', eventHandler.buttonClick.bind(eventHandler), false);

})();