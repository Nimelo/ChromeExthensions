var actual_time = 100;
Read();
//ZoomBy10();
GO();
function GO()
{
	setInterval(function(){myTimer()}, 1000);
	function myTimer(){
		Count();
	}
}

function Count()
{
	if(actual_time > 0)
	{
		actual_time = actual_time - 1;
	}
	else if(actual_time <= 0)
	{
		actual_time = 100;
	}
	
	Write(actual_time);
}

function Write(param)
{
	var storage = chrome.storage.local;	
	var obj ={};
	obj["actual_time"] = param;
	storage.set(obj);
}

function Read()
{
	var storage = chrome.storage.local;	
	var obj ={};
	
	storage.get("actual_time", function(result)
	{
		actual_time = result["actual_time"];
	});
}

function ZoomBy10()
{
	var tabs = chrome.windows.getAll({populate:true}, function(windows){
		windows.forEach(function(window){
			console.log(window.id);
			window.tabs.forEach(function(tab){
			console.log(tab.url);
			});
		});
	});
}