		function CallWebServiceFromJqueryTemplateID() {
            try {

                //alert("Monank");
				
				TemplateID = window.localStorage.getItem("TemplateID");
				
				
                var u = window.localStorage.getItem("username");
                var p = window.localStorage.getItem("password");
                 var ip = window.localStorage.getItem("ip");
               var port = window.localStorage.getItem("port");
				
				
               if (u != "") { 
                   
                       $.ajax({
                           type: "GET",
                           url: localStorage.ipAddressOrder + ":" + localStorage.step2Port + "/VOTSMobile/Services/xml/getTemplateID/" + u + "/" + p,
                           dataType: "text",
                           crossDomain: true,
                           processData: false,
                           success: OnSuccessTemplateID,
                           error: OnErrorTemplateID,
                           cache: false
                       });
                   
                   
               }
               else {
               }

            }
            catch (e) {
               // alert("CallWebServiceFromJquery " + e);
            }


        }
		
		
		var redirectToLiveRates = false;
		var TemplateID;
		function OnSuccessTemplateID(data, status) {
//           alert(data);
           
           // alert(sessionStorage.username)
			try {
			
				
				//alert(data);
				var messages1 = data.replace('\"', '');
				messages1 = messages1.replace('\"', '');
				TemplateID = messages1;
				window.localStorage.setItem("TemplateID",TemplateID);
				//alert(TemplateID);
				if (redirectToLiveRates)
				{
					
					window.location.href = "index.html";	
					
				}
				
			
            }
            catch (e) {
              //  alert("No Internet Connection Available");
            }
             

        }

        function OnErrorTemplateID(request, status, error) {
			
            //alert("error : " + error);
        }