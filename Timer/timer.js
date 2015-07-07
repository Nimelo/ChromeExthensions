function GO()
{
	setInterval(function(){myTimer()}, 100);
	function myTimer(){
		Update();
	}	
}

function Update()
{
 var x = document.getElementById("status");
	x.innerHTML = chrome.extension.getBackgroundPage().actual_time;
}


document.addEventListener('DOMContentLoaded', function () {  
document.getElementById("Invoke-Button").addEventListener("click",GO);
document.getElementById("status").innerHTML = chrome.extension.getBackgroundPage().actual_time;
}
);
