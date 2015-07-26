/**/
function Idle(){
  
}

/**/
Idle.detectionInterval = 60;

/**/
chrome.storage.sync.get("Idle.detectionInterval", function(obj){
  if(typeof(obj["Idle.detectionInterval"]) != 'undefined'){
    Idle.detectionInterval = obj["Idle.detectionInterval"]
    chrome.idle.setDetectionInterval(Idle.detectionInterval);
  }
});

/**/
chrome.idle.onStateChanged.addListener(function(idleStatus){
  console.log(idleStatus);
  switch(idleStatus){
    case "active":
      ChangeOnActive();
      break;
    case "idle":
      ChangeOnIdle();
      break;
    case "locked":
      ChangeOnIdle();
      break;
      default:
      
  }
});

/**/
chrome.idle.setDetectionInterval(Idle.detectionInterval);

function ChangeOnIdle(){
  chrome.windows.getAll({}, function(windows){
    
    for(i = 0; i < windows.length; i++){
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
    
  });
}

function ChangeOnActive(){
  chrome.windows.getAll({}, function(windows){
    
    for(i = 0; i < windows.length; i++){
      if(windows[i].focused){
        
        Extension.windows.addDistinct(new Core(windows[i].id));
        var windowHistory = Extension.windows.get(new Core(windows[i].id));
        if(typeof(windowHistory) != 'undefined'){
            
          windowHistory.clear();
          windowHistory.lastTabId = tab.id;
          windowHistory.lastTabUrl = tab.url;
          windowHistory.lastTabBegin = new Date();
        	console.log("Activated " +  tab.url);
        }
      }
  }

   });
}