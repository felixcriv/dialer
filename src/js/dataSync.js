'use strict';


var dialr = new Firebase('https://dialr.firebaseio.com/');
var dataRef = dialr.child("data");
var table = require('./createTableEntry');
var trIndex;

//syncs data
(function sync() {

    dataRef.orderByValue().on('child_added', function(data) {
        table.createTR(data.exportVal(), data.key(), data.exportVal().UISync || data.exportVal().fav)
    });

})();

//save a new entry
//UISync allows to add the entry to the table but it will remove 
//next time it loads if not saved or fav
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

//remove an entry 
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

function update(fav, key, index) {
    

    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
        	trIndex = index;
            console.log('Synchronization succeeded');
        }
    };

    dataRef.child(key).update({
        fav: fav ? false : true
    }, onComplete);
}


dataRef.on('child_changed', function(data) {
    var tr = document.getElementById(data.key());
    tr.childNodes[4].childNodes[0].childNodes[0].childNodes[0].style.color = data.exportVal().fav ? '#d61a7f' : '';
});


dataRef.off("value");

exports.save = save;
exports.update = update;
exports.remove = remove;