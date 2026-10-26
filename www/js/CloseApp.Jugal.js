document.addEventListener("deviceready", onDeviceReadyCloseApp, false);

			function onDeviceReadyCloseApp() {
				try
				{
		
					document.addEventListener("backbutton", onBackKeyDownCloseApp, false);
					document.addEventListener("pause", onPauseCloseApp, false);
		
				}
				catch (e) {
					//alert("onDeviceReady " + e);
				}

        
			}


	function onPauseCloseApp(e) {
        //e.preventDefault();
        //navigator.app.exitApp();
		//setTimeout("showInterstitialFunc()", 10); //500
  
    }

    
    function onBackKeyDownCloseApp(e) {
    
    	//alert('backbutton pressed');
        //e.preventDefault();
        navigator.app.exitApp();
		//setTimeout("showInterstitialFunc()", 10); //500
    	//e.preventDefault();
    
    }