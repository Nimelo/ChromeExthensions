/*Informations*/

/*Occurs when new tabs is created*/
chrome.tabs.onCreated.addListener(OnCreated);

/*Occurs when there is new query executed*/
chrome.tabs.onUpdated.addListener(OnUpdated);

/*Occurs when there is removed tab*/
chrome.tabs.onRemoved.addListener(OnRemoved);

/*Occurs when there is new active tab selected*/
chrome.tabs.onActivated.addListener(OnActivated);



/*Callbacks*/
function OnCreated(tab){

//console.log("OnCreated");

}

/**/
function OnUpdated(tabId, changeInfo, tab)
{
	console.log("OnUpdated");
	if(lastActivatedTabId != -1)
		{
			var newTab = new NTab(lastActivatedTabUrl);
			historyOfTabs.get(newTab).actions.last().end = new Date();		
		}
		
		lastActivatedTabId = tabId;
		lastActivatedTabUrl = tab.url;
		
		var newTab = new NTab(tab.url);
		historyOfTabs.addDistinct(newTab);
		historyOfTabs.get(newTab).actions.add(new Timespan(new Date()));

    Messaging.sendMessage("Write", historyOfTabs.toString());

}

/**/
function OnActivated(info)
{
	console.log("OnActivated");
	
	
	if(lastActivatedTabId != -1)
	{
		var newTab = new NTab(lastActivatedTabUrl);
		historyOfTabs.get(newTab).actions.last().end = new Date();		
	}
	
	lastActivatedTabId = info.tabId;
	
	chrome.tabs.get(info.tabId,  function(tab){
	
			lastActivatedTabUrl = tab.url;
			var newTab = new NTab(tab.url);
			historyOfTabs.addDistinct(newTab);
			historyOfTabs.get(newTab).actions.add(new Timespan(new Date()));
			
			//console.log(tab.url);
		}
	)
	
	Messaging.sendMessage("Write", historyOfTabs.toString());
}

/**/
function OnRemoved(tabId, removeInfo)
{
	console.log("OnRemoved");
	
	if(tabId == lastActivatedTabId)
	{
		var newTab = new NTab(lastActivatedTabUrl);
		historyOfTabs.get(newTab).actions.last().end = new Date();		
		
		lastActivatedTabId = -1;
		lastActivatedTabUrl = "";		
	}
	
	Messaging.sendMessage("Write", historyOfTabs.toString());
}

/*Core*/
var historyOfTabs = new List();
var lastActivatedTabId = -1;
var lastActivatedTabUrl = "";

/**/
function Read()
{
	var storage = chrome.storage.sync;
	var obj = {};
	
	storage.get("all", function(result)
	{
		historyOfTabs = result["all"];
	});
}

/**/
function Write()
{
	var storage = chrome.storage.sync;
	var obj = {};
	obj["all"] = historyOfTabs;
	storage.set({'all': historyOfTabs});
}

