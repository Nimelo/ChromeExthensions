/*Occurs when focus of any window is changing*/
chrome.windows.onFocusChanged.addListener(OnFocusChanged);

/*Occurs when new window is creating*/
chrome.windows.onCreated.addListener(OnCreated)

/*Occurs when any window is closing*/
chrome.windows.onRemoved.addListener(OnRemoved)


/*ReadMe */
/*
- chrome.windows.WINDOW_ID_NONE  => When minimize command is send
- chrome.windows.WINDOW_ID_CURRENT => Don't really know when
/

/*FUNCTIONS*/

var last = -1;

var isBusy = false;

function OnFocusChanged(windowId){
	
	if(windowId == chrome.windows.WINDOW_ID_NONE)
	{
		console.log("WINDOW_ID_NONE!");
		if(last != -1)
		{
			try
			{
				chrome.windows.get(last, function(window){
					if(typeof window != "undefined")
							console.log(window.focused);
					}
				);
			}
			catch(err)
			{
			}
			
		}
		
	}
	else if(windowId == chrome.windows.WINDOW_ID_CURRENT)
	{
		console.log("WINDOW_ID_CURRENT!");
	}
	else
	{
		last = windowId;
		console.log("WTF!");		
		
			try
			{
				chrome.windows.get(windowId, function(window){
					if(typeof window != "undefined")
						console.log(window.focused);
					}			
				);
			}
			catch(err)
			{
			}
			
	}
	
	
}

/**/
function OnCreated(window){
	
	windows.add(new NWindow(window.id));
}

/**/
function OnRemoved(windowId){
	last = -1;
	windows.del(new NWindow(windowId));
}

var windows = new List();