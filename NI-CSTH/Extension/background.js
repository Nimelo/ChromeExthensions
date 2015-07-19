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
	
  chrome.tabs.get(tabId, function(tab){
        var windowHistory = Extension.windows.get(tab.windowId);
        windowHistory.prepareMessage();
        windowHistory.clear();
        windowHistory.lastTabId = tab.id;
        windowHistory.lastTabUrl = tab.url;
        windowHistory.lastBegin = new Date();
      }
  );
   // Messaging.sendMessage("Write", Core.historyOfTabs.toString());

}

/**/
function OnActivated(info)
{
	console.log("OnActivated");
	
	
  chrome.tabs.get(info.tabId, function(tab){
        var windowHistory = Extension.windows.get(tab.windowId);
        windowHistory.prepareMessage();
        windowHistory.clear();
        windowHistory.lastTabId = tab.id;
        windowHistory.lastTabUrl = tab.url;
        windowHistory.lastBegin = new Date();
      }
  );
	
	//Messaging.sendMessage("Write", Core.historyOfTabs.toString());
}

/**/
function OnRemoved(tabId, removeInfo)
{
	console.log("OnRemoved");
	
  var windowHistory = Extension.windows.get(removeInfo.windowId);
  windowHistory.prepareMessage();
  windowHistory.clear();

	
	//Messaging.sendMessage("Write", Core.historyOfTabs.toString());
}


