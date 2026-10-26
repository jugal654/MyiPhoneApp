
function removeAllRowsFromTable_ShowData() {
    //alert("11");
    $("#ChartDataa").empty();
}



//function fnStartClock() {

//    try {
//        oInterval = setInterval("refreshData()", 500); //500
//    }
//    catch (e) {
//        // alert("fnStartClock" + e);
//    }
//}

//function refreshData() {
//    CallWebServiceFromJquery();
//}

//function fnStopClock() {
//    try {
//        clearInterval(oInterval);
//    }
//    catch (e) {
//    }
//}





function CallWebServiceFromJquery_ShowData() {
    try {
        //alert('CallWebServiceFromJquery_ShowData');
        $.ajax({
            type: "GET",
            //            url: "http://166.62.117.175:8811/VOTSBroadcast/Services/xml/GetLiveRate",
            //            url: "http://mobiletradingbroadcast.arihantspot.com:8888/VOTSBroadcast/Services/xml/GetLiveRate",
            //url: "http://mobiletradingbroadcast.arihantspot.com:8888/VOTSBroadcast/Services/xml/GetLiveRate",
            //url:"http://chart.arihantspot.com:8788/VOTSBroadcast/Services/xml/GetChartDataInCSVDateWise/GOLD 99.5 T+0/20181001/20181008",
            url: localStorage.chartIpAddress + ":" + localStorage.chartPort + "/VOTSBroadcast/Services/xml/GetChartDataInCSVDateWise/" + Main_Name + "/" + _StartDateValue + "/" + _EndDateValue + "",
            dataType: "text",
            crossDomain: true,
            processData: false,
            success: OnSuccess_ShowData,
            error: OnErrorShowData,
            cache: false
        });
    }
    catch (e) {
        //alert("CallWebServiceFromJquery " + e);
    }
}

//function addZero(i) {
//    if (i < 10) {
//        i = "0" + i;
//    }
//    return i;
//}


var maxRows = 0;
var oldData;
var counterRefresh = 0;

var AlertList = [];

function OnSuccess_ShowData(data, status) {
    //alert(data);
    try {
        stopSpinner();
        

        removeAllRowsFromTable_ShowData();
        var zebra_HD = document.getElementById("ChartDataa");
        var trow_HD;

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


            var trowString_HD = "";
            //alert(messages.length);

            //            if ($("#mySelect").val() === null) {
            for (var i = 1; i < messages.length; i++) {

                var ret;
                var oldRet;


                if (messages[i]) {
                    //var ret = jQuery.parseJSON(messages[i]);
                    ret = messages[i].split(",");
                }

                if (messagesOld[i]) {
                    //var ret = jQuery.parseJSON(messages[i]);
                    oldRet = messagesOld[i].split(",");
                }



                //alert(ret[0] + " ---> " + ret[1]);


                trowString_HD = trowString_HD + "<tr style=\"box-shadow: 0px 0px 1px 1px #ffffff;-webkit-border-radius: 4px !Important;\">" +
	                                        "<td>" +
		                                        "<span style=\"font-size:16px;font-weight:600\">" + ret[0] + "</span>" +
	                                        "</td>" +
	                                        "<td>" +
		                                        "<span>" + ret[1] + "</span>" +
	                                        "</td>" +
                                        "</tr>";

               
            }
            //            }


            trow_HD = $(trowString_HD);
            trow_HD.prependTo(zebra_HD);

            oldData = data.toString();

        }

        if (counterRefresh == 0) {
            //myScroll.refresh();
            counterRefresh = counterRefresh + 1;
        }


        //Success2_gvData_Trending_Fetch(data, status); //OnSuccess2 Function 2

    }
    catch (e) {
        alert("OnSuccess " + e);
    }


}



function OnErrorShowData(request, status, error) {
    //alert("Webservice Error: " + request.statusText + " " + error);
}


//$(document).ready(function () {
//    fnStartClock();
//});
//    

