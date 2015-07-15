

chrome.runtime.onMessageExternal.addListener(OnMessageExternalHandler);

/**/
function Messaging(){
}

/**/
Messaging.blacklistedIds = ["none"];

/**/
Messaging.sendMessage = function(appId, type, text){
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
function OnMessageExternalHandler(request, sender, sendResponse){
  if(sender.id in Messaging.blacklistedIds){
    sendResponse({"result":"You are on black list!"});
    return;
  }
  else{
    switch(request.type){
      case "Notification":
         new Notification('Notification', {body: request.message});
        break;
      case "Test":
       new Notification('Test', {body: request.message});
        break;
      case "Write":
        FileManagment.writeData(request.message);
        //new Notification('Write', {body: ""});
        break;
        
      case "Read":
        FileManagment.readData(function(result){
          Messaging.sendMessage(sender.id, "", result);
          //new Notification('Read', {body: result});
          }
        );
       
        break;
      default:
        alert(request.message);
    }
    
  }
}