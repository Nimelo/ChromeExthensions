/*On start up*/

function Extension(){
  
}

function SendLast(){
  if(Extension.currentTab != null){
	      Extension.currentTab.prepareMessage(function(result){
	      Messaging.sendMessage({
                type: "Write",
                message: result  + "\n"
              });
	    });
	    Extension.currentTab.clear();
  }
}

function NoteNew(){
  
  chrome.windows.getCurrent({populate:true}, function(window){
    chrome.tabs.query({active:true, windowId:window.id}, function(tabs){
          tab = tabs[0];
          if(typeof(tab) == 'undefined') return;
          Extension.currentTab = new Core(tab.windowId)
            Extension.currentTab.lastTabId = tab.id;
            Extension.currentTab.lastTabUrl = tab.url;
            Extension.currentTab.lastTabBegin = new Date();
            console.log("Window focus changed on " + tab.url); 
        }
    );
    
  });
  
}

function Perform(){
  SendLast();
  NoteNew();
}

Extension.currentTab = null;

Extension.isIdle = false;

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
		console.log("WINDOW_ID_NONE!");
		SendLast();
	}
	else if(windowId == chrome.windows.WINDOW_ID_CURRENT)
	{
		console.log("WINDOW_ID_CURRENT!");
	}
	else
	{
	  console.log("Active Window's id: " +  windowId);
	  Perform();
	}
}

/**/
function OnCreated(window){
  console.log("Created " + window.id);
	Perform();
	
}

/**/
function OnRemoved(windowId){
  console.log("Removed " + windowId);
  Perform();
}

/**/
function CheckWindowsFocus(){
  howManyFocused = 0;
  focuesedId = -1;
  chrome.windows.getAll({}, function(windows){
    
    for(i = 0; i < windows.length; i++){
      if(windows[i].focused){
        howManyFocused++;
        focuesedId = windows[i].id;
      }}
      
     if(howManyFocused > 0 && Extension.isIdle == false){
      if(Extension.currentTab == null || Extension.currentTab.lastTabId == -1){
        NoteNew();
      }

      }else{
        SendLast();
      }
      
  });
 
}

/**/
function Intervals(){
  setInterval(CheckWindowsFocus, 1000);
}

Intervals();

