function CallWebServiceFromJqueryLiveRateMessage() {
    try {
        //alert('hi');
        //startSpinner();

        $.ajax({
            type: "GET",
            //url: localStorage.webPanel + "/WebServiceLiveRatePageMessage.asmx/getLiveRatePageMessage?username=" + localStorage.appnameWithMiniadminId,
            url: localStorage.ticker1 + localStorage.appnameWithMiniadminId + "/" + "fixmessage1" + localStorage.tickerr1,
            dataType: "text",
            crossDomain: true,
            processData: false,
            success: OnSuccessLiveRateMessage,
            error: OnErrorLiveRateMessage,
            cache: false
        });
    }
    catch (e) {
        //alert("CallWebServiceFromJquery " + e);
    }


}

var convertLiveRateMessage = function (convert) {

    return $("<span />", { html: convert }).text();

};

var LiveRateMessage = "";

function OnSuccessLiveRateMessage(data, status) {
    console.log(data);
    try {
        //stopSpinner();
        // change start
        var messages = data;
        messages = messages.replace('|', '');
        messages = messages.replace('|', '');
        messages = messages.replace('|', '');
        messages = messages.replace('|', '');
        // change end



        //console.log("messages" + messages);
        if (typeof messages != 'undefined') {



            var msg = messages;
            //console.log(msg.length);
            if (msg.length > 5) {

                //alert(msg);
                //var trowString = convertLiveRateMessage(msg);

                var trowString = msg;
                LiveRateMessage = trowString;
                float_Message();
                //$("#gvDataLiveRateMessage").html(trowString);


                //trowString.prependTo(zebra);
                //trow = $(trowString);
                //alert(trow);
                //trow.prependTo(zebra);
                setTimeout(function () {
                    if (localStorage.MainUserName && localStorage.MainMobileNumber) {
                        if (!sessionStorage.LiveRateMessage) {
                            sessionStorage.LiveRateMessage = "1";
                            var msg = "<div style=\"text-align:center;font-weight: 700;text-transform: uppercase;\">Welcome to" + "<span style=\"display:block\">" + localStorage.MainUserName + "</span><span style=\"display:block\">(" + localStorage.MainMobileNumber + ")</span></div>";  //messages[1];
                            //alert(msg);
                            if (msg.length > 5) {

                                //alert(msg);
                                var trowString = msg;  //convertLiveRateMessage(msg);
                                LiveRateMessage = trowString;
                                float_Message();
                                //$("#gvDataLiveRateMessage").html(trowString);


                                //trowString.prependTo(zebra);
                                //trow = $(trowString);
                                //alert(trow);
                                //trow.prependTo(zebra);
                            }
                            else {
                                LiveRateMessage = "";

                            }
                        } //if (!sessionStorage.LiveRateMessage) {
                    } //if (localStorage.MainUserName && localStorage.MainMobileNumber) {
                }, 2000);











            }
            else {
                LiveRateMessage = "";

            }


        }
        else {
            LiveRateMessage = "";

        }

    }
    catch (e) {
        //alert("OnSuccess" + e);
    }


}




function OnErrorLiveRateMessage(request, status, error) {
    //stopSpinner();
    //alert("Webservice Error: " + request.statusText);
}

$(document).ready(function () {

    //CallWebServiceFromJqueryLiveRateMessage();			

});
	
		