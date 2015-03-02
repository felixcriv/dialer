'use strict';

var sound = require('./emitSound');
var data = require('./dataSync');

var reminder;

function createTR(data, key, n) {

    var tr = document.createElement('tr');
    var created = moment();

    var baseRef = new Firebase('https://dialr.firebaseio.com/data/' + key);

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    if (n) {
        var phone = document.createElement('span');
        phone.innerHTML = '<a href="tel:' + data.phone + '">' + data.phone + '</a>';


        var fav = document.createElement('span');
        fav.innerHTML = '<button type="button" class="btn btn-default btn-sm">' +
            '<span class = "glyphicon glyphicon-heart" aria-hidden = "true" style="color:'+ (data.fav ? '#d61a7f' : '') +'"></span></button>';

        var remind = document.createElement('span');
        remind.innerHTML = '<button id="' + key + '" style="margin-left:3px;" type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-bullhorn" aria-hidden = "true"></span></button>';

        var remove = document.createElement('span');
        remove.innerHTML = '<button id="' + key + '" style="margin-left:3px;" type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-remove" aria-hidden = "true"></span></button>';

        td1.appendChild(phone);
        td2.appendChild(document.createTextNode(data.state.toUpperCase()));
        td3.appendChild(document.createTextNode(moment().format("h:mm a")));
        td4.appendChild(document.createTextNode('a few seconds ago'));
        td5.appendChild(fav);
        td5.appendChild(remind);
        td5.appendChild(remove);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        baseRef.once('child_removed', function(data) {
            listBody.deleteRow(tr.rowIndex - 1);
        });


        phone.onclick = function() {
            tr.style.color = 'black';
            clearTimeout(reminder);
            remind.childNodes[0].style.color = '';
        };


        fav.onclick = function() {

            var isFav = this.childNodes[0].childNodes[0].style.color;
            this.childNodes[0].childNodes[0].style.color = isFav ? '' : '#d61a7f';
            baseRef.update({
                fav: isFav ? false : true
            });
        };

        remind.onclick = function() {

            var isReminded = remind.childNodes[0].style.color;

            remind.childNodes[0].style.color = isReminded ? '' : 'orange';

            tr.style.color = phone.style.color ? '' : 'orange';

            if (remind.childNodes[0].style.color) {
                if (notify.permissionLevel()) {

                    var minutes = ~~prompt('Remind me in .. ? (minutes)', '10');

                    if (minutes > 0) {
                        reminder = setTimeout(function() {
                            notify.createNotification("Make a call", {
                                body: data.phone,
                                icon: "alert.ico"
                            });
                            sound.playSound(function() {});
                            remind.childNodes[0].style.color = '';
                        }, minutes * 60000);
                    }else{
                        alert('Please type a non-zero value');
                    }
                }

            } else {
                tr.style.color = '';
                clearTimeout(reminder);
            }
        };

        remove.onclick = function() {
            clearTimeout(reminder);
            data.remove(key);
        };

        setInterval(function() {
            td4.innerHTML = moment().from(created, true) + " ago"
        }, 1000);

        //void sync after 5 secs
        setTimeout(function() {
            baseRef.update({
                UISync: 0
            });
        }, 5000);

        return listBody.appendChild(tr);
    }
}

exports.createTR = createTR;