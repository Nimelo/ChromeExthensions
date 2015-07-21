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
	  //console.log("Active Window's id: " +  windowId);

    var windowHistory = Extension.windows.get(windowId);
    if(typeof(windowHistory) != 'undefined'){
            
      windowHistory.prepareMessage(function(result){
        Messaging.sendMessage("Write", result  + "\n");
      });
              
      windowHistory.clear();
    
  		//chrome.tabs.query({active:true, windowId:windowId}, function(tabs){tabs.forEach(function(el){console.log(el.url + " " + el.id)})})
  		
  		chrome.windows.getAll({}, function(windows){
  		  windows.forEach(function(window){
  		    
  		    if(window.focused){
  		      chrome.tabs.query({active:true, windowId:windowId}, function(tabs){
  		        tabs.forEach(function(tab){
  		          if(typeof(tab) != 'undefined'){
          		      windowHistory.lastTabId = tab.id;
          		      windowHistory.lastTabUrl = tab.url;
          		      windowHistory.lastTabBegin = new Date();
  		          }
  		        });
  		      });
  		    }
  	   });
  		});
  	}
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
  Extension.windows.del(windowId);
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
        var windowHistory = Extension.windows.get(windows[i].id);
        if(typeof(windowHistory) != 'undefined'){
            
              windowHistory.prepareMessage(function(result){
                Messaging.sendMessage("Write", result  + "\n");
              });
              
              windowHistory.clear();
            }
      }
    }
    
    if(howManyFocused == 0){
  		//console.log("There is no active windows");
    }
    else{
     // console.log("There is: " + howManyFocused + " focused windows!");
    }
  });

  
}

/**/
function Intervals(){
  setInterval(CheckWindowsFocus, 1000);
}

Intervals();
