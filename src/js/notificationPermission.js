//Checks notification permission on the browser.

function checkNotificationPermission() {
    notify.config({
        pageVisibility: false,
        autoClose: 0
    });

    if (notify.permissionLevel() == notify.PERMISSION_DEFAULT) {
        notify.requestPermission(function(v) {
            return 1;
        })
    } else if (notify.permissionLevel == notify.PERMISSION_GRANTED) {
        return 1;
    }
    return 0;
}

exports.checkNotificationPermission = checkNotificationPermission;