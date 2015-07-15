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

		/*TODO*/
		//active tab from last active window should be closed
	}
	else if(windowId == chrome.windows.WINDOW_ID_CURRENT)
	{
		console.log("WINDOW_ID_CURRENT!");
	}
	else
	{
	  	console.log("ELSE!");
	/*  	if(Core.lastActivatedTabId != -1)
		  {
  			var newTab = new NTab(Core.lastActivatedTabUrl);
  			Core.historyOfTabs.addDistinct(newTab);
  			Core.historyOfTabs.get(newTab).actions.last().end = new Date();		
		  }
		
		Core.lastActivatedTabId = -1;
		Core.lastActivatedTabUrl = "";
	*/
		
		//chrome.tabs.query({active:true, windowId:windowId}, function(tabs){tabs.forEach(function(el){console.log(el.url + " " + el.id)})})
		
		chrome.windows.getAll({}, function(windows){
		  windows.forEach(function(window){
		    
		    if(window.focused){
		      var tab;
		      chrome.tabs.query({active:true, windowId:windowId}, function(tabs){
		        tabs.forEach(function(el){
		          return el;
		          
		        });
		      });
		      
		      if(typeof(tab) != 'undefined'){
  		      Core.lastActivatedTabId = tab.id;
  		      Core.lastActivatedTabUrl = tab.url;
  			    var newTab = new NTab(tab.url);
      			Core.historyOfTabs.addDistinct(newTab);
      			Core.historyOfTabs.get(newTab).actions.add(new Timespan(new Date()));
		      }
		    }
		    
		  });
		});
	}
	
}

/**/
function OnCreated(window){
	
}

/**/
function OnRemoved(windowId){

}

/**/
function CheckWindowsFocus(){
  howManyFocused = 0;
  chrome.windows.getAll({}, function(windows){
    
    for(i = 0; i < windows.length; i++){
      if(windows[i].focused){
        howManyFocused++;
      }
    }
    
    if(howManyFocused == 0){
      if(Core.lastActivatedTabId != -1)
  		  {
    			var newTab = new NTab(Core.lastActivatedTabUrl);
    			Core.historyOfTabs.get(newTab).actions.last().end = new Date();		
  		  }
  		
  		Core.lastActivatedTabId = -1;
  		Core.lastActivatedTabUrl = "";
    }
    else{
    }
  });

  
}

/**/
function Intervals(){
  setInterval(CheckWindowsFocus, 2500);
}

Intervals();