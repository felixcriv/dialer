'use strict';


var dialr = new Firebase('https://dialr.firebaseio.com/');
var dataRef = dialr.child("data");

function createTableEntry(msg) {
    createTR(msg);
}

function createTR(msg, key) {

    var tr = document.createElement('tr');
    var created = moment();


    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    var span = document.createElement('span');
    span.innerHTML = '<a href="tel:' + msg.phone + '">' + msg.phone + '</a>';
    td1.appendChild(span);


    td2.appendChild(document.createTextNode(msg.state.toUpperCase()));
    td3.appendChild(document.createTextNode(moment().format("h:mm a")));
    td4.appendChild(document.createTextNode('a few seconds ago'));

    var fav = document.createElement('span');
    fav.innerHTML = '<button type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-heart" aria-hidden = "true"></span></button>';


    var remove = document.createElement('span');
    remove.innerHTML = '<button id="' + key + '" style="margin-left:3px;" type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-trash" aria-hidden = "true"></span></button>';

    fav.onclick = function() {
        this.childNodes[0].style.color = this.childNodes[0].style.color ? '' : '#d61a7f';
        var phone = this.parentElement.parentElement.childNodes[0].childNodes[0].textContent;
        var state = this.parentElement.parentElement.childNodes[1].textContent;


        if (this.childNodes[0].style.color) {
            localstorage.savePhone(phone, state, moment());
        } else {
            localstorage.removePhone(phone);
        }
    };

    remove.onclick = function() {
        dataRef.child(this.childNodes[0].attributes[0].value).remove();
    };

    dataRef.on('child_removed', function(old) {
        console.log('removed');
        var row = remove.parentNode.parentNode;
        row.parentNode.removeChild(row);

    });

    td5.appendChild(fav);
    td5.appendChild(remove);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    setInterval(function() {
        td4.innerHTML = moment().from(created, true) + " ago"
    }, 1000);

    return listBody.appendChild(tr);
}


function savePhone(phone, state, time) {

    var ref = dataRef.push({
        phone: phone,
        state: state,
        fav: false,
        time: time.toString()
    });

    return ref.key();
}

function removePhone(phone) {


}

function getSavedPhones(cb) {

    dataRef.once("value", function(snap) {

        var keys = Object.keys(snap.val() || {});
        var lastIdInSnapshot = keys[keys.length]

        dataRef.startAt(null, lastIdInSnapshot).on("child_added", function(newMessSnapshot) {

            cb(newMessSnapshot.val(), newMessSnapshot.key());
        });
    })
}


exports.createTableEntry = createTableEntry;
exports.getSavedPhones = getSavedPhones;
exports.savePhone = savePhone;
exports.createTR = createTR;