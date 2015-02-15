var user;
function ToggleLight(){
	var hue = jsHue();
	var ip;
	hue.discover(
	    function(bridges) {
	        if(bridges.length === 0) {
	            console.log('No bridges found. :(');
	        }
	        else {
	            bridges.forEach(function(b) {
	                console.log('Bridge found at IP address %s.', b.internalipaddress);
					ip = b.internalipaddress
					user = hue.bridge(ip).user('chromeappchromeappchromeappchromeapp');
					user.getLight(6, function(success){lightstate(success)});
	            });
	        }
	    }
	);
}

function lightstate(light)
{
	console.log(light.state.on);
	if (light.state.on == false)
	{
		user.setLightState(6, { on: true });
		chrome.browserAction.setIcon({path:"images/lightswitch.logo.on.128.png"});
	}
	else
	{
		user.setLightState(6, { on: false });
		chrome.browserAction.setIcon({path:"images/lightswitch.logo.128.png"});
	}
}
function setupIcon(){
	var hue = jsHue();
	var ip;
	hue.discover(
	    function(bridges) {
	        if(bridges.length === 0) {
	            console.log('No bridges found. :(');
	        }
	        else {
	            bridges.forEach(function(b) {
	                console.log('Bridge found at IP address %s.', b.internalipaddress);
					ip = b.internalipaddress
					user = hue.bridge(ip).user('chromeappchromeappchromeappchromeapp');
					user.getLight(6, function(success){setupLight_Callback(success)});
	            });
	        }
	    }
	);
}

function setupLight_Callback(light){
	if (light.state.on == true)
	{
		chrome.browserAction.setIcon({path:"images/lightswitch.logo.on.128.png"});
	}
	else
	{
		chrome.browserAction.setIcon({path:"images/lightswitch.logo.128.png"});
	}
}
chrome.browserAction.onClicked.addListener(function(tab) { ToggleLight()});
setupIcon();