
function removeAllRowsFromTable() {

    $("#gvDataMessage tbody tr").remove();

}


function fnStartClock() {

    try {
		startSpinner();
		
        //oInterval = setInterval("CallWebServiceFromJquery()", 500);
        CallWebServiceFromJquery();
    }
    catch (e) {
        // alert("fnStartClock" + e);
    }
}

function fnStopClock() {
    try {
        //clearInterval(oInterval);
    }
    catch (e) {
        //  alert("fnStopClock" + e);
    }
}

function CallWebServiceFromJquery() {
    try {

        $.ajax({
            type: "GET",
            //                    url: "http://bullion.chirayusoft.com/GetMessage.asmx/GetMessagesList?username=srilalithagold",
            //url: "http://autonews.safaribullions.in:9100/api/GetNewsList",
            url: localStorage.newsIpAddress + ":" + localStorage.newsPort + "/api/GetNewsList",
            dataType: "text",
            crossDomain: true,
            processData: false,
            success: OnSuccess,
            error: OnError,
            cache: false
        });


    }
    catch (e) {
        //alert("CallWebServiceFromJquery " + e);
    }


}
var maxRows = 0;
var oldData;
var screenFontSize = 14;


var convert = function (convert) {

    return $("<span />", { html: convert }).text();

};

function OnSuccess(data, status) {
    //alert(data);
    try {
		
		stopSpinner();
		
        var JSONString = data;

        //                var JSONObject = JSON.parse(JSONString);
        //                console.log(JSONObject);      // Dump all data of the Object in the console
        //                alert(JSONObject[0]["Title"]); // Access Object data


        //                for (var i = 0; i < JSONString.length; i++) {
        ////                    for (var key in data[i]) {
        ////                        if (col.indexOf(key) === -1) {
        ////                            col.push(key);
        ////                        }
        //                    //                    }


        //                    var JSONObject = JSON.parse(JSONString);
        //                    console.log(JSONObject);      // Dump all data of the Object in the console
        //                    alert(JSONObject[i]["Title"]); // Access Object data

        //                }


        var JSONObject = JSON.parse(JSONString);
        console.log(JSONObject);      // Dump all data of the Object in the console


        var tbl = $("<table class=\"News_Class\" width=\"100%\" style=\"color:#FFF;\" />").attr("id", "mytable");
        $("#div1").append(tbl);

        var trowString = "";
        //alert(JSONObject.length);
        //JSONString.length
        for (var i = 0; i < JSONObject.length; i++) {




            //alert(JSONObject[0]["Title"]); // Access Object data

            trowString = trowString + "<table class=\"News_Class\" width=\"100%\" style=\"color:#FFF;\">" +
                                                "<tr>" +
                                                    "<td>" +
                                                        "<a style=\"cursor:pointer;\" class=\"aTag\" id=" + JSONObject[i]["Id"] + " onclick=\"javascript:myFunctionClick('" + JSONObject[i]["Id"] + "')\" >" + //href=\"News_Details.html\"
                                                        "<span class=\"Title_News\">" + JSONObject[i]["Title"] + "</span>" +
                                                        "<span class=\"Date_News\">" + JSONObject[i]["Date"] + "</span> " +
//                                                        "<span class=\"Date_News_second\">" + JSONObject[i]["Source"] + "</span>" +
                                                        "</a>" +
                                                    "</td> " +
                                                "</tr>" +
                                            "</table>";




        }

        $("#mytable").append(trowString);




    }
    catch (e) {
        // alert("OnSuccess" + e);
    }


}



function OnError(request, status, error) {
   // alert("Webservice Error: " + request.statusText);
}


$(document).ready(function () {

    fnStartClock();
});














