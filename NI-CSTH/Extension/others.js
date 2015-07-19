/**/
function Read()
{
	var storage = chrome.storage.sync;
	var obj = {};
	
	storage.get("all", function(result)
	{
		Core.historyOfTabs = result["all"];
	});
}

/**/
function Write()
{
	var storage = chrome.storage.sync;
	var obj = {};
	obj["all"] = Core.historyOfTabs;
	storage.set({'all': Core.historyOfTabs});
}