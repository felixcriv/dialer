'use strict';

var dialr = new Firebase('https://dialr.firebaseio.com/');
var dataRef = dialr.child("data");

var reminder;

function savePhone(phone, state, sync) {

    var data = {
        phone: phone,
        state: state,
        fav: false,
        UISync: sync,
        time: moment().toString()
    };

    dataRef.push(data);
}


function createTR(msg, key, n) {

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
        phone.innerHTML = '<a href="tel:' + msg.phone + '">' + msg.phone + '</a>';


        var fav = document.createElement('span');
        fav.innerHTML = '<button type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-heart" aria-hidden = "true"></span></button>';

        var remind = document.createElement('span');
        remind.innerHTML = '<button id="' + key + '" style="margin-left:3px;" type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-bullhorn" aria-hidden = "true"></span></button>';

        var remove = document.createElement('span');
        remove.innerHTML = '<button id="' + key + '" style="margin-left:3px;" type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-remove" aria-hidden = "true"></span></button>';

        td1.appendChild(phone);
        td2.appendChild(document.createTextNode(msg.state.toUpperCase()));
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


        baseRef.once('value', function(snap) {
            fav.childNodes[0].style.color = snap.val().fav ? '#d61a7f' : '';
        });

        baseRef.once('child_removed', function(data) {
            listBody.deleteRow(tr.rowIndex - 1);
        });


        phone.onclick = function() {
            tr.style.color = 'black';
            clearTimeout(reminder);
            remind.childNodes[0].style.color = '';
        };


        fav.onclick = function() {

            baseRef.once('value', function(snap) {
                fav.childNodes[0].style.color = snap.val().fav ? '#d61a7f' : '';
            });


            baseRef.update({
                fav: fav.childNodes[0].style.color ? false : true
            });

            this.childNodes[0].style.color = this.childNodes[0].style.color ? '' : '#d61a7f';
            var phone = this.parentElement.parentElement.childNodes[0].childNodes[0].textContent;
            var state = this.parentElement.parentElement.childNodes[1].textContent;

        };

        remind.onclick = function() {

            remind.childNodes[0].style.color = remind.childNodes[0].style.color ? '' : 'orange';

            tr.style.color = phone.style.color ? '' : 'orange';

            if (remind.childNodes[0].style.color) {
                if (notify.permissionLevel()) {

                    var minutes;

                    do {
                        minutes = ~~prompt('Remind me in .. ? (minutes)', '10');
                        console.log(minutes);
                    } while (minutes <= 0);

                    reminder = setTimeout(function() {
                        notify.createNotification("Make a call", {
                            body: msg.phone,
                            icon: "alert.ico"
                        });
                        playSound();
                    }, minutes * 60000);
                }

            } else {
                tr.style.color = '';
                clearTimeout(reminder);
            }

            function playSound() {

                var sine1 = T("sin", {
                    freq: 240,
                    mul: 0.51
                });
                var sine2 = T("sin", {
                    freq: 400,
                    mul: 0.54
                });

                T("perc", {
                    r: 675
                }, sine1, sine2).on("ended", function() {
                    this.pause();
                }).bang().play();

                remind.childNodes[0].style.color = '';
            }

        };

        remove.onclick = function() {

            clearTimeout(reminder);

            var onComplete = function(error) {
                if (error) {
                    console.log('Synchronization failed');
                } else {
                    console.log('Synchronization succeeded');
                }
            };
            baseRef.remove(onComplete());
        }

        setInterval(function() {
            td4.innerHTML = moment().from(created, true) + " ago"
        }, 1000);

        //forgetting sync after 5 secs
        setTimeout(function() {
            baseRef.update({
                UISync: 0
            });
            console.log({
                UISync: 0
            });
        }, 5000);

        return listBody.appendChild(tr);
    }
}


dataRef.orderByValue().on('child_added', function(data) {
    createTR(data.exportVal(), data.key(), data.exportVal().UISync || data.exportVal().fav)
});

dataRef.off("value");

exports.savePhone = savePhone;
exports.createTR = createTR;