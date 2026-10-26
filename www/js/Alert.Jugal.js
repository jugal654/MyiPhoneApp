
function alert1(strMessage)
{

    if (navigator.notification) {

        navigator.notification.alert(
            strMessage,         // message
            null,                 // callback
            'Alert',           // title
            'Ok'                  // buttonName
        );

    }
    else {
        alert(strMessage);
    }
			

}

