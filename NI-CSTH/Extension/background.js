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
        if(typeof(windowHistory) != 'undefined'){
            
              windowHistory.prepareMessage(function(result){
                Messaging.sendMessage("Write", result  + "\n");
              });
              
              windowHistory.clear();
            }
        windowHistory.lastTabId = tab.id;
        windowHistory.lastTabUrl = tab.url;
        windowHistory.lastTabBegin = new Date();
      }
  );
}

/**/
function OnActivated(info)
{
	console.log("OnActivated");
	

  chrome.tabs.get(info.tabId, function(tab){
    	try{
          var windowHistory = Extension.windows.get(tab.windowId);
          if(typeof(windowHistory) != 'undefined'){
            
              windowHistory.prepareMessage(function(result){
                Messaging.sendMessage("Write", result  + "\n");
              });
              
              windowHistory.clear();
            }
            windowHistory.lastTabId = tab.id;
            windowHistory.lastTabUrl = tab.url;
            windowHistory.lastTabBegin = new Date();
          }
    	catch(ex){
	      console.log(ex);
	    }
    }
  );
	
	
	//Messaging.sendMessage("Write", Core.historyOfTabs.toString());
}

/**/
function OnRemoved(tabId, removeInfo)
{
	console.log("OnRemoved");
	
  var windowHistory = Extension.windows.get(removeInfo.windowId);
  if(typeof(windowHistory) != 'undefined'){
            
              windowHistory.prepareMessage(function(result){
                Messaging.sendMessage("Write", result  + "\n");
              });
              
              windowHistory.clear();
            }


	
	//Messaging.sendMessage("Write", Core.historyOfTabs.toString());
}


