
function removeAllRowsFromAutoCallsTable() {

    $("#div2").empty();

}

function CallWebServiceFromJquery_1() {
    try {

        //startSpinner();

        $.ajax({
            type: "GET",
            //url: localStorage.autocallIpAddress + ":" + localStorage.autocallPort + "/api/GetResult/GOLD%20COSTING",
            //url:"https://autocallsilver.chirayusoft.com:9023/api/GetResult/GOLD%20COSTING",
            url: "https://autocallgold.chirayusoft.com:9023/api/GetResult/GOLD%20COSTING",
            dataType: "text",
            crossDomain: true,
            processData: false,
            success: OnSuccess_AutoCalls,
            error: OnError_Autocalls,
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



function OnSuccess_AutoCalls(data, status) {
    //    alert(data);
    try {

        //stopSpinner();

        removeAllRowsFromAutoCallsTable();

        var trowString = "";
        var JSONString = data;
        //        alert(JSONString);



        var JSONObject1 = JSON.parse(JSONString);

        var colorBox = "style=\"background-color: #23a8e1 !Important;\""
        var colorLevels = "style=\"color: #FFF;\"";
        if (JSONObject1["Result"] == "Buy") {
            colorBox = "style=\"background-color: #23a8e1 !Important;\""
            colorLevels = "style=\"color: #FFF;\"";
        }


        //        alert(JSONObject1["Target1"]);
        //        {"Result":"NA","Percentage":0,"Target1":"31318","Target2":"31242","StopLoss":"31503",
        //        "EntryPrice":"31390","Message":"Sell Below 31390.0000 and book profit around 31318"}

        trowString = trowString + //"<div class=\"title1 color-black\" style=\"text-align:center;\">Gold Trend</div>" +

                                    "<div class=\"progressbar\" data-animate=\"false\">" +
					                    "<div class=\"circle\" data-percent=\"" + JSONObject1["Percentage"] + "\">" +
						                    "<div class=\"\"></div>" +
					                    "</div>" +
				                    "</div>" +

                                    "<div class=\"indicator\" style=\"width: 100%;text-align: center;margin: .5em 0;\">" +
                                        "<div class=\"label label-red\" style=\"background: #ddac2a;\">" + JSONObject1["Result"] + "</div>" +
                                    "</div>" +

                                    "<br>" +

                                    "<div class=\"green indicator\" style=\"color:#FFF;\">" + JSONObject1["Message"] + "</div>" +

                                    "<br>" +

                                    "<table width=\"100%\" align=\"center\" " + colorLevels + ">" +
                                        "<tr>" +
                                            "<td class=\"title\" style=\"padding: 20px 0 5px 0;\">Entry Price :</td>" +
                                            "<td class=\"value\" style=\"padding: 20px 0 5px 10px;\">" + JSONObject1["EntryPrice"] + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td class=\"title\" style=\"padding: 5px 0 5px 0;\">Stop Loss :</td>" +
                                            "<td class=\"value\" style=\"padding: 5px 0 5px 10px;\">" + JSONObject1["StopLoss"] + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td class=\"title\" style=\"padding: 5px 0 5px 0;\">Target 1 :</td>" +
                                            "<td class=\"value\" style=\"padding: 5px 0 5px 10px;\">" + JSONObject1["Target1"] + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td class=\"title\" style=\"padding: 5px 0 20px 0;\">Target 2 :</td>" +
                                            "<td class=\"value\" style=\"padding: 5px 0 20px 10px;\">" + JSONObject1["Target2"] + "</td>" +
                                        "</tr>" +
                                    "</table>";





        trowString = trowString + "<br/><a class=\"Disclaimerr\" href=\"Disclaimer.html\" data-ajax='false' style=\"color:#FFF;font-size:9px;\">Auto Generated Indicator based on Technical Analysis. Please read the Disclaimer.</a>";
        $("#div2").append(trowString);


        RunAnimationn(JSONObject1["Result"]);
        //RunAnimationn("Sell");



    }
    catch (e) {
        // alert("OnSuccess" + e);
    }


}



function OnError_Autocalls(request, status, error) {
    //alert("Webservice Error: " + request.statusText);
}




