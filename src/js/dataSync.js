'use strict';

var dialr = new Firebase('https://dialr.firebaseio.com/');
var dataRef = dialr.child("data");
var table = require('./createTableEntry');
var trIndex;

var onComplete = function(error) {
    if (error) {
        console.log('Synchronization failed');
    } else {
        console.log('Synchronization succeeded');
    }
};

//syncs data
(function sync() {

    dataRef.orderByValue().on('child_added', function(data) {
        //should create new entry if UISync OR fav is true
        table.createTR(data.exportVal(), data.key(), data.exportVal().UISync || data.exportVal().fav)
    });

})();

//save a new entry
//UISync allows to add the entry to the table but it will remove 
//next time it loads if not saved or fav, see UISync(key)
function save(phone, state, sync, shouldSynNotification) {
    var data = {
        phone: phone,
        state: state,
        fav: false,
        UISync: sync,
        UIShouldSyncNotification: shouldSynNotification,
        time: moment().toString()
    };

    dataRef.push(data);
}

//remove an entry 
function remove(key) {
    dataRef.child(key).remove(onComplete);
}

function saveFav(key, isFav) {

    dataRef.child(key).update({
        fav: isFav ? false : true
    }, onComplete);
}

function saveNotification(key, shouldSynNotification){

     dataRef.child(key).update({
        UIShouldSyncNotification: shouldSynNotification
    }, onComplete);
}

//void database sync after 5 secs
function UISync(key) {
    return setTimeout(function() {
        dataRef.child(key).update({
            UISync: 0
        });
    }, 5000);
}

dataRef.on('child_changed', function(data) {
    //sync UI
    var tr = document.getElementById(data.key());
    
    tr.childNodes[4].childNodes[0].childNodes[0].childNodes[0].style.color = data.exportVal().fav ? '#d61a7f' : '';
    tr.style.color = data.exportVal().UIShouldSyncNotification ? 'orange': '';
    tr.childNodes[4].childNodes[1].childNodes[0].childNodes[0].style.color = data.exportVal().UIShouldSyncNotification ? 'orange' : '';
});


dataRef.on('child_removed', function(data) {
    //sync UI
    var tr = document.getElementById(data.key());
    listBody.deleteRow(tr.rowIndex - 1);
});


dataRef.off("value");

exports.save = save;
exports.saveFav = saveFav;
exports.saveNotification = saveNotification;
exports.UISync = UISync;
exports.remove = remove;