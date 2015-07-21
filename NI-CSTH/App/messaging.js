

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
        /*FileManagment.readData(function(result){
          Messaging.sendMessage(sender.id, "", result);
          //new Notification('Read', {body: result});
          }
        );*/
       
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
      console.log("Request for monthly history!");
      
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var names = DateHelper.prepareNamesMonth(year, month);
      this.tmpResult = "";
      names.forEach(function(name, index, array){
        //console.log(index);
        if(index != names.length - 1){
          FileManagment.readData(name, function(result){ 
            if(result != "")
              this.tmpResult +=  result;
        });
          }
          else{
            FileManagment.readData(name, function(result){ 
            if(result != "")
              this.tmpResult += result;
            //console.log(this.tmpResult);
            Messaging.sendMessage(sender.id, "", this.tmpResult);
        });
          }
        
      })
      
      break;
    
    case "Today": 
      console.log("Request for today's history!");
      FileManagment.readData(FileManagment.getCurrentFileName(), function(result){       
          Messaging.sendMessage(sender.id, "", result);
        });
      
      break;
      
    default:
      alert(request.message);
  }
}