'use strict';

function playSound(cb) {

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

    cb();
}

exports.playSound = playSound;