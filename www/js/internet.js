
$(document).ready(function () {

	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);
	localStorage.isOffline = "0";

});



function onOffline() {
    // Handle the offline event
	localStorage.isOffline = "1";
	var r = confirm("Internet is NOT working. Do you want to re-load?");
                if (r == true) {
                    //e.preventDefault();
                    location.href = "index.html";

                } else {
                    //do nothing
                }
				
	
}


function onOnline() {
	if (localStorage.isOffline == "1")
	{
		localStorage.isOffline == "0";
		// Handle the online event
		var r = confirm("Internet is working now. Do you want to re-load?");
					if (r == true) {
						//e.preventDefault();
						location.href = "index.html";

					} else {
						//do nothing
					}
			
	}
    			
	
}

