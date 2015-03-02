'use strict';


var dialr = new Firebase('https://dialr.firebaseio.com/');
var dataRef = dialr.child("data");
var table = require('./createTableEntry');


(function sync() {

    dataRef.orderByValue().on('child_added', function(data) {
        table.createTR(data.exportVal(), data.key(), data.exportVal().UISync || data.exportVal().fav)
    });

})();


function save(phone, state, sync) {
    var data = {
        phone: phone,
        state: state,
        fav: false,
        UISync: sync,
        time: moment().toString()
    };

    dataRef.push(data);
}

function remove(key) {
    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };
    dataRef.child(key).remove(onComplete);
}

dataRef.off("value");

exports.save = save;
exports.remove = remove;