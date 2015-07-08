function UpdateUI(text)
{
	var x = document.getElementById("status");
	x.innerHTML = text;
}

document.addEventListener('DOMContentLoaded', function () {  

	chrome.storage.onChanged.addListener(function(changes, namespace){
		for(key in changes)
		{	
			var storageChange = changes[key];
			if(key == "actual_time")
			{
				UpdateUI(storageChange.newValue);
			}
		}
		console.log("changed");
	});

});