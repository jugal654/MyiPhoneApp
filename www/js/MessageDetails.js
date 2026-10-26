


function removeAllRowsFromTable() {

    $("#gvDataMessage tbody tr").remove();

}

function fnStartClock() {

    try {
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

		startSpinner();

        var url_string = document.URL.valueOf('?text1='); //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("text1");
        //        console.log(c);
        //        alert(c);



        $.ajax({
            type: "GET",
            //                    url: "http://bullion.chirayusoft.com/GetMessage.asmx/GetMessagesList?username=srilalithagold",
            //url: "http://autonews.safaribullions.in:9100/api/GetNewsList/" + c,
            url: localStorage.newsIpAddress + ":" + localStorage.newsPort + "/api/GetNewsList/" + c,
            dataType: "text",
            crossDomain: true,
            processData: false,
            success: OnSuccess,
            error: OnError,
            cache: false
        });


    }
    catch (e) {
       // alert("CallWebServiceFromJquery " + e);
    }


}
var maxRows = 0;
var oldData;
var screenFontSize = 14;

var deletedScrips = new Array();


var convert = function (convert) {

    return $("<span />", { html: convert }).text();

};

function OnSuccess(data, status) {
    //alert(data);
    try {

		stopSpinner();
		
        var JSONString = data;

        var tbl = $("<table class=\"News_Class\" width=\"100%\" style=\"color:#FFF;\" />").attr("id", "mytable");
        $("#div2").append(tbl);

        var trowString = "";
        //        alert(JSONString.length);
        //JSONString.length
        for (var i = 0; i < 1; i++) {



            var JSONObject = JSON.parse(JSONString);
            console.log(JSONObject);      // Dump all data of the Object in the console
            //alert(JSONObject[0]["Title"]); // Access Object data

            trowString = trowString + "<table class=\"News_Class\" width=\"100%\" style=\"color:#FFF;\">" +
                                        "<tr>" +
                                            "<td>" +
                                                "<span class=\"Title_News\">" + JSONObject[i]["title"] + "</span>" +
                                                "<span class=\"Date_News\">" + JSONObject[i]["pubdate"] + "</span> " +
            //                                                "<span class=\"Date_News_second\">" + JSONObject[i]["source"] + "</span>" +
                                            "</td> " +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>" +
            //                                                "<h3><u>Description</u></h3>" +
                                                "<p class=\"text-justify Title_Des\">" + JSONObject[i]["description"] + "</p>" +
                                            "</td>" +
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
	stopSpinner();
    //alert("Webservice Error: " + request.statusText);
}


$(document).ready(function () {

    fnStartClock();
});













