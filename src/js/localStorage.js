'use strict';

function detectLocalStorage() {
    return "localStorage" in window;
}


function savePhone(phone, time) {
    if (detectLocalStorage()) {
        var currentData = localStorage['data'];

        if (currentData) {
            currentData = JSON.parse(localStorage['data']);
            currentData.push({
                phone: phone,
                created: time
            });
            localStorage['data'] = JSON.stringify(currentData);
        } else {
            var c = [];
            c.push({
                phone: phone,
                created: time
            });
            localStorage['data'] = JSON.stringify(c);
        }
    }
}

function getSavedPhones() {
    if (detectLocalStorage()) {
        var currentData = localStorage['data'];

        if (currentData) {
            return JSON.parse(currentData);
        }
    }
    return false;
}


exports.savePhone = savePhone;
exports.getSavedPhones = getSavedPhones;
exports.detectLocalStorage = detectLocalStorage;