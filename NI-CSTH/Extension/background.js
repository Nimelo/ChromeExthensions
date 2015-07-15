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
	if(Core.lastActivatedTabId != -1)
		{
			var newTab = new NTab(Core.lastActivatedTabUrl);
			Core.historyOfTabs.get(newTab).actions.last().end = new Date();		
		}
		
		Core.lastActivatedTabId = tabId;
		Core.lastActivatedTabUrl = tab.url;
		
		var newTab = new NTab(tab.url);
		Core.historyOfTabs.addDistinct(newTab);
		Core.historyOfTabs.get(newTab).actions.add(new Timespan(new Date()));

    Messaging.sendMessage("Write", Core.historyOfTabs.toString());

}

/**/
function OnActivated(info)
{
	console.log("OnActivated");
	
	
	if(Core.lastActivatedTabId != -1)
	{
		var newTab = new NTab(Core.lastActivatedTabUrl);
		Core.historyOfTabs.get(newTab).actions.last().end = new Date();		
	}
	
	Core.lastActivatedTabId = info.tabId;
	
	chrome.tabs.get(info.tabId,  function(tab){
	
			Core.lastActivatedTabUrl = tab.url;
			var newTab = new NTab(tab.url);
			Core.historyOfTabs.addDistinct(newTab);
			Core.historyOfTabs.get(newTab).actions.add(new Timespan(new Date()));
			
			//console.log(tab.url);
		}
	)
	
	Messaging.sendMessage("Write", Core.historyOfTabs.toString());
}

/**/
function OnRemoved(tabId, removeInfo)
{
	console.log("OnRemoved");
	
	if(tabId == Core.lastActivatedTabId)
	{
		var newTab = new NTab(Core.lastActivatedTabUrl);
		Core.historyOfTabs.get(newTab).actions.last().end = new Date();		
		
		Core.lastActivatedTabId = -1;
		Core.lastActivatedTabUrl = "";		
	}
	
	Messaging.sendMessage("Write", Core.historyOfTabs.toString());
}

/*Core*/
function Core(){
}

Core.historyOfTabs = new List();
Core.lastActivatedTabId = -1;
Core.lastActivatedTabUrl = "";

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

