

chrome.runtime.onConnectExternal.addListener(OnConnectExternalHandler);

/**/
function Messaging(){
}

/**/
Messaging.blacklistedIds = ["none"];

/**/
function OnConnectExternalHandler(port){
  port.onMessage.addListener(function(request){
    console.log(request.type);
    switch(request.type){
      case "Echo":
        port.postMessage({message: request.message});
        break;
      case "Notification":
         new Notification('Notification', {body: request.message});
        break;
      case "Test":
       new Notification('Test', {body: request.message});
        break;
      case "Write":
        FileManagment.writeData(request.message);
        if(socket.socket.readyState == 1)
        socket.socket.send(request.message);//new Notification('Write', {body: ""});
        break;
        
      case "Read":
        OnReadRequest(request, port);
        break;
      default:
        //alert(request.message);
    }
  });
};


function OnReadRequest(request, port){
  switch(request.message){
    case "Year":
      
      
      console.log("Request for yearly history!");
      break;
      
    case "Day":
      var day = request.day;
      console.log("Request for day " + day);
      FileManagment.readData(day, function(result){ 
        port.postMessage({message:result, 
                          type: "Day",
                          day: request.day
        });
        });
      
      break;
    
    case "Today": 
      console.log("Request for today's history!");
      FileManagment.readData(FileManagment.getCurrentFileName(), function(result){ 
          port.postMessage({message:result, 
                          type: "Today"
        });
        });
      break;
      
    default:
      //alert(request.message);
  }
}