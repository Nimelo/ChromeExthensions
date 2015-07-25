var serviceUrl = 'ws://localhost:4649/FileHistory';

var socket = new Socketing(serviceUrl);
socket.init();


function writeFile(fileName, text){
  var textToSend = "Write:[" + fileName + "]" + text;
  socket.socket.send(textToSend);
}

function readFiles(namesOfFiles){
  var array = namesOfFiles;
  
  var textToSend = "Read:[";
  array.forEach(function(el){
    textToSend += el +",";
  })
  
  textToSend += "]";
  
  socket.socket.send(textToSend);
  //TODO
}