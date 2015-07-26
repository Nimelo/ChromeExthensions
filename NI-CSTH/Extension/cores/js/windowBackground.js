/*On start up*/

function Extension(){
  
}

Extension.windows = new List();

Extension.history = new List();
/*Occurs when focus of any window is changing*/
chrome.windows.onFocusChanged.addListener(OnFocusChanged);

/*Occurs when new window is creating*/
chrome.windows.onCreated.addListener(OnCreated);

/*Occurs when any window is closing*/
chrome.windows.onRemoved.addListener(OnRemoved);



/*ReadMe */
/*
- chrome.windows.WINDOW_ID_NONE  => When minimize command is send
- chrome.windows.WINDOW_ID_CURRENT => Don't really know when
/

/*FUNCTIONS*/


function OnFocusChanged(windowId){
	
	if(windowId == chrome.windows.WINDOW_ID_NONE)
	{
		//console.log("WINDOW_ID_NONE!");
    CheckWindowsFocus();
  	//Core.prepareMessage();
    //Core.clear();
		
	}
	else if(windowId == chrome.windows.WINDOW_ID_CURRENT)
	{
		//console.log("WINDOW_ID_CURRENT!");
	}
	else
	{
	  console.log("Active Window's id: " +  windowId);
	  
	  chrome.windows.getLastFocused(function(window){
	    var tmp = Extension.windows.get(new Core(window.id));
	    if(typeof(tmp) != 'undefined'){
	      tmp.prepareMessage(function(result){
	      Messaging.sendMessage({
                type: "Write",
                message: result  + "\n"
              });
	    });
	    }
	    
	  });
	  
	  chrome.tabs.query({active:true, windowId:windowId}, function(tabs){
      
          tab = tabs[0];
          if(typeof(tab) == 'undefined') return;
          Extension.windows.addDistinct(new Core(tab.windowId));
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
            console.log("Window focus changed on " + tab.url); 
        }
    );
              
	}
}

/**/
function OnCreated(window){
  console.log("Created " + window.id);
	Extension.windows.addDistinct(new Core(window.id));
}

/**/
function OnRemoved(windowId){
  console.log("Removed " + windowId);
  Extension.windows.del(new Core(windowId));
}

/**/
function CheckWindowsFocus(){
  howManyFocused = 0;
  chrome.windows.getAll({}, function(windows){
    
    for(i = 0; i < windows.length; i++){
      if(windows[i].focused){
        howManyFocused++;
      }
      else{
        Extension.windows.addDistinct(new Core(windows[i].id));
        var windowHistory = Extension.windows.get(new Core(windows[i].id));
        if(typeof(windowHistory) != 'undefined'){
            
              windowHistory.prepareMessage(function(result){
                Messaging.sendMessage({
                type: "Write",
                message: result  + "\n"
              });
                windowHistory.clear();
              });
            }
      }
    }
  });

  
}

/**/
function Intervals(){
  setInterval(CheckWindowsFocus, 4000);
}

Intervals();

