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
	
	
  chrome.tabs.get(tabId, function(tab){
        if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
     console.log("OnUpdated")
    //Checking if update is fired on active tab!
    chrome.tabs.query({active:true}, function(tabs){
      
        if(tabs.some(function(el, index, array){
          return el.id == tab.id;
        })){
          Extension.windows.addDistinct(new Core(tab.windowId));
          var windowHistory = Extension.windows.get(new Core(tab.windowId));

          windowHistory.prepareMessage(function(result){
            Messaging.sendMessage({
                type: "Write",
                message: result  + "\n"
              });
            windowHistory.clear();
            windowHistory.lastTabId = tab.id;
            windowHistory.lastTabUrl = tab.url;
            windowHistory.lastTabBegin = new Date();
            console.log("Updated tab " + tab.url); 
          });
        }
    });
  }
  });
}

/**/
function OnActivated(info)
{

  chrome.tabs.get(info.tabId, function(tab){
    	if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    	    if(typeof(tab) == 'undefined') {
    	      console.log("OnActivated Tab is undefined!")
    	      return;
    	    }
    	    console.log("OnActivated")
    	    Extension.windows.addDistinct(new Core(tab.windowId));
    	    console.log(tab.windowId);
          var windowHistory = Extension.windows.get(new Core(tab.windowId));
            
          windowHistory.prepareMessage(function(result){
            Messaging.sendMessage({
                type: "Write",
                message: result  + "\n"
              });
            windowHistory.clear();
          });
          
          
          windowHistory.lastTabId = tab.id;
          windowHistory.lastTabUrl = tab.url;
          windowHistory.lastTabBegin = new Date();
        	console.log("Activated " +  tab.url);
       
    }   
    }
  );
	
}

/**/
function OnRemoved(tabId, removeInfo){
	
  var windowHistory = Extension.windows.get(removeInfo.windowId);
  if(typeof(windowHistory) != 'undefined'){
            
    windowHistory.prepareMessage(function(result){
      Messaging.sendMessage({
                type: "Write",
                message: result  + "\n"
              });
      windowHistory.clear();
    });
    console.log("Removed current tab");          
  }else{
    console.log("Removed not current tab");
  }

}


