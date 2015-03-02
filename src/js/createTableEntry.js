'use strict';

var sound = require('./emitSound');
var _data = require('./dataSync');


alertify.defaults.glossary.title = "Reminder";

var reminder;

function createTR(data, key, UISync) {

    var tr = document.createElement('tr');
    tr.id = key;
    tr.style.color = (data.UIShouldSyncNotification ? 'orange' : '');
    var created = moment();

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    if (UISync) {
        var phone = document.createElement('span');
        phone.innerHTML = '<a href="tel:' + data.phone + '">' + data.phone + '</a>';


        var fav = document.createElement('span');
        fav.innerHTML = '<button type="button" class="btn btn-default btn-sm">' +
            '<span class = "glyphicon glyphicon-heart" aria-hidden = "true" style="color:' + (data.fav ? '#d61a7f' : '') + '"></span></button>';

        var remind = document.createElement('span');
        remind.innerHTML = '<button style="margin-left:3px;" type="button" class="btn btn-default btn-sm">' +
            '<span class = "glyphicon glyphicon-bullhorn" aria-hidden ="true" style="color:' + (data.UIShouldSyncNotification ? 'orange' : '') + '"></span></button>';

        var remove = document.createElement('span');
        remove.innerHTML = '<button style="margin-left:3px;" type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-remove" aria-hidden = "true"></span></button>';

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

        phone.onclick = function() {
            _data.saveNotification(key, false);
            clearTimeout(reminder);
        };


        fav.onclick = function() {
            var favIcon = this.childNodes[0].childNodes[0].style.color;
            _data.saveFav(key, favIcon);
        };

        remind.onclick = function() {

            if (!tr.style.color) {
                if (notify.permissionLevel()) {
                    alertify.prompt("Remind me in .. ? (minutes)", "10",
                        function(evt, value) {
                            
                            var minutes = ~~value;

                            if (minutes > 0) {
                                _data.saveNotification(key, true);
                                alertify.success('I will remind you in ' + value + ' minutes');
                                reminder = setTimeout(function() {
                                    notify.createNotification("Make a call", {
                                        body: data.phone,
                                        icon: "alert.ico"
                                    });
                                    sound.playSound(function() {});
                                    //tr.style.color = '';
                                }, minutes * 60000);
                            } else {
                                alertify.error('Please type a non-zero value');
                            }
                        },
                        function() {
                            //alertify.error('Cancel');
                        });
                }
            } else {
                //tr.style.color = '';
                _data.saveNotification(key, false);
                clearTimeout(reminder);
            }
        };

        remove.onclick = function() {
            clearTimeout(reminder);
            _data.remove(key);
        };

        setInterval(function() {
            td4.innerHTML = moment().from(created, true) + " ago"
        }, 1000);

        //no sync this entry on browser reload
        _data.UISync(key);

        return listBody.appendChild(tr);
    }
}

exports.createTR = createTR;