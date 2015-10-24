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
  chrome.windows.getCurrent({populate:true}, function(window){
    chrome.tabs.query({active:true, windowId:window.id}, function(tabs){
          vtab = tabs[0];
          if(typeof(tab) == 'undefined') return;
          if(tab.id == tabId){
            Perform();
          }
        }
    );
  });
}

/**/
function OnActivated(info)
{

 Perform();
	
}

/**/
function OnRemoved(tabId, removeInfo){
	
  Perform();

}


