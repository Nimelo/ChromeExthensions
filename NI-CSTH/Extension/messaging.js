
/**/
chrome.runtime.onMessageExternal.addListener(OnMessageExternalHandler);


/**/
function Messaging(){
}

/**/
Messaging.blacklistedIds = ["none"];

var appId = "ioahanpfejhfkddophnidknicmaohfif";

/**/
Messaging.lastResponse = "";

/**/
Messaging.sendMessage = function(type, text){
  chrome.
  runtime.
  sendMessage(appId,
              {
                type: type,
                message: text
              }, 
              function(response) { 
                 console.log(response);
              }
  );
};

/**/
Messaging.sendMessageWaitRespond = function(type, text, callback){
  chrome.runtime.onMessageExternal.removeListener(OnMessageExternalHandler);
  chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse){
    if(sender.id in Messaging.blacklistedIds){
    sendResponse({"result":"You are on black list!"});
    return;
  }
  else{
      callback(request.message);
      Messaging.lastResponse = request.message;
    }
  });
  
  Messaging.sendMessage(type, text);
  
  chrome.runtime.onMessageExternal.addListener(OnMessageExternalHandler);
}

/**/
function OnMessageExternalHandler(request, sender, sendResponse){
  if(sender.id in Messaging.blacklistedIds){
    sendResponse({"result":"You are on black list!"});
    return;
  }
  else{
      Messaging.lastResponse = request.message;
        //alert(request.message);
    }
    
  
}

