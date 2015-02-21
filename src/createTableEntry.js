'use strict';

function createTableEntry(msg) {

    var tr = document.createElement('tr');
    var created = moment();

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');

    var span = document.createElement('span');
    span.innerHTML = '<a href="tel:' + msg.phone + '">' + msg.phone + '</a>';

    td1.appendChild(span);
    td2.appendChild(document.createTextNode(msg.state.toUpperCase()));
    td3.appendChild(document.createTextNode(moment().format("h:mm a")));
    td4.appendChild(document.createTextNode('a few seconds ago'));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    setInterval(function() {
        td4.innerHTML = moment().from(created, true) + " ago"
    }, 1000);

    return listBody.appendChild(tr);

}

exports.createTableEntry = createTableEntry;