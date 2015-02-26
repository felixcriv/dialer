'use strict';

var localstorage = require('./localStorage');

function createTableEntry(msg) {
    createTR(msg);
}


function createTR(msg) {

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

    var span2 = document.createElement('span');
    span2.innerHTML = '<button type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-heart" aria-hidden = "true"></span></button>';

    ////////
    span2.onclick = function() {
        this.childNodes[0].style.color = this.childNodes[0].style.color ? '' : '#d61a7f';

        if (this.childNodes[0].style.color) {

            var phone = this.parentElement.parentElement.childNodes[0].childNodes[0].textContent;

            localstorage.savePhone(phone, moment());
        }
    };
    td5.appendChild(span2);

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

exports.createTableEntry = createTableEntry;