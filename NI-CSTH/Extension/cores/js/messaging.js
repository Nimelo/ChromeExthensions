/**/
function Messaging(){
}
//var serviceUrl = 'ws://localhost:4649/FileHistory';

//var socket = new Socketing(serviceUrl);
//socket.init();

/**/
Messaging.blacklistedIds = ["none"];

var appId = "pfocmjaloogdegfccbhohfjffioajaeo";//"ioahanpfejhfkddophnidknicmaohfif";

/**/
Messaging.lastResponse = "";

/**/
Messaging.sendMessage = function(obj){
  
 /* if(socket.socket.readyState == 1){
    socket.socket.send(obj.message);
  }*/
  var port = chrome.runtime.connect(appId);
  port.postMessage(obj);
  port.disconnect();
};

Messaging.sendMessageWaitRespond = function(obj, listener){
  var port = chrome.runtime.connect(appId);
  port.onMessage.addListener(listener);
  
  port.postMessage(obj);
  //port.disconnect();
}

/**/
function OnMessageExternalHandler(request){
  switch(request.type){
    case "Year":
      break;
    case "Day":
      var day = request.day;
      break;
    case "Today":
      var result = request.message;
      
      break;
    default:
      
  }
}

