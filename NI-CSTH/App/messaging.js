

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
        OnReadRequest(request, sender);
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

function OnReadRequest(request, sender){
  switch(request.message){
    case "Year":
      
      
      console.log("Request for yearly history!");
      break;
      
    case "Month":
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var names = DataHelper.prepareNamesMonth(year, month);
      this.tmpResult = "";
      
      names.forEach(function(names, index){
        FileManagment.readData(name, function(result, index){  
          if(index != names.length){
            this.tmpResult += result;
          }
          else{
            this.tmpResult += result;
            Messaging.sendMessage(sender.id, "", this.tmpResult);
          }
        });
      })
      console.log("Request for monthly history!");
      break;
    
    case "Today": 
      FileManagment.readData(FileManagment.getCurrentFileName(), function(result){       
          Messaging.sendMessage(sender.id, "", result);
        });
      console.log("Request for today's history!");
      break;
      
    default:
      alert(request.message);
  }
}