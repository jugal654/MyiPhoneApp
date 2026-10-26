
function removeAllRowsFromTable() {
    //alert("11");
    $("#mySelect").empty();
}



function fnStartClock() {

    try {
        refreshData();
        //oInterval = setInterval("refreshData()", 500); //500
    }
    catch (e) {
        // alert("fnStartClock" + e);
    }
}

function refreshData() {
    CallWebServiceFromJquery();
}

function fnStopClock() {
    try {
        clearInterval(oInterval);
    }
    catch (e) {
    }
}





function CallWebServiceFromJquery() {
    try {
        //alert('CallWebServiceFromJquery');
        $.ajax({
            type: "GET",
            //            url: "http://166.62.117.175:8811/VOTSBroadcast/Services/xml/GetLiveRate",
            //            url: "http://mobiletradingbroadcast.arihantspot.com:8888/VOTSBroadcast/Services/xml/GetLiveRate",
            url: localStorage.ipAddressBCast + ":" + localStorage.step3StreamingPort + "/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/" + window.localStorage.defaultScripTemplateId,
            dataType: "text",
            crossDomain: true,
            processData: false,
            success: OnSuccess1,
            error: OnError1,
            cache: false
        });
    }
    catch (e) {
        //alert("CallWebServiceFromJquery " + e);
    }
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


var maxRows = 0;
var oldData;
var counterRefresh = 0;

var AlertList = [];

function OnSuccess1(data, status) {
    //alert(data);
    try {

        var messages = data.split("\n");

        if (typeof oldData != 'undefined') {
        }
        else {            
            oldData = data.toString();
        }

        var messagesOld = oldData.split("\n");

        if (typeof messages != 'undefined') {
            if (maxRows == 0) {
                maxRows = messages.length;
            }
            //            removeAllRowsFromTable();
            //            var zebra = document.getElementById("gvData");
            //            var trow;
            //            var trowString = "";


            
//            for (var i = 0; i <= messages.length; i++) {
//                if (i == Main_ID) {
//                    var ret = messages[i].split("\\u0009");
//                    var oldRet;

//                    document.getElementById("sell_rate").innerHTML = ret[3];
//                }
//            }



			
            if ($("#mySelect").val() === null) {
                
                for (var i = 0; i <= messages.length; i++) {

                    //var ret = jQuery.parseJSON(messages[i]);
                    var ret = messages[i].split("\t");
                    var oldRet;

                    //                oldRet = messagesOld[i].split("\\u0009");

                    if (typeof ret[1] != 'undefined') {
                        $('#mySelect').append($('<option>',
                         {
                             value: ret[1],
                             text: ret[2]
                         }));
                     }
                     if (i == 0) {
                         Main_Name = ret[1];                        
                     }


                }
            }

			$('#mySelect').val(Main_Name);	
			
            oldData = data.toString();

        }

        if (counterRefresh == 0) {
            //myScroll.refresh();
            counterRefresh = counterRefresh + 1;
        }


        //Success2_gvData_Trending_Fetch(data, status); //OnSuccess2 Function 2

    }
    catch (e) {
        //alert("OnSuccess" + e);
    }


}



function OnError1(request, status, error) {
    //alert("Webservice Error: " + request.statusText + " " + error);
}


$(document).ready(function () {
    fnStartClock();
});
    

