
/**/
function FileManagment(){
}

/**/
FileManagment.file = "";

/**/
FileManagment.temporaryResult = "";

/**/
FileManagment.writeData = function (data){
    chrome.syncFileSystem.requestFileSystem(function(fs){
  
      fs.root.getFile(FileManagment.getCurrentFileName(), {create: true}, function(fileEntry){
    
      //FileManagment.file = fileEntry;
        fileEntry.createWriter(function(writer){
          
          writer.onwriteend = function(e){
            
            console.log("Write completed!");
            
          };
          
          writer.onerror = function(e){
           
            console.log(e);
            
          };
          
          writer.seek(writer.length);
          var blob = new Blob([data], {type: 'text/plain'});
          writer.write(blob);
          
        });
      });
    });
    
    
};

/**/
FileManagment.truncateData = function(){
   
    chrome.syncFileSystem.requestFileSystem(function(fs){
  
      fs.root.getFile(FileManagment.getCurrentFileName(), {create: true}, function(fileEntry){
    
      //FileManagment.file = fileEntry;
        fileEntry.createWriter(function(writer){
          
          writer.onwriteend = function(e){
            
            console.log("Write completed!");
            
          };
          
          writer.onerror = function(e){
           
            console.log(e);
            
          };
          writer.truncate(0);
        });
      });
    });
};  

/**/
FileManagment.readData = function (fileName, callback){
    chrome.syncFileSystem.requestFileSystem(function(fs){
  
      fs.root.getFile(fileName, {create: true}, function(fileEntry){
    
      //FileManagment.file = fileEntry;
        fileEntry.file(function(fileObject){
      
          var reader = new FileReader();
          
          reader.onloadend = function(e){
            
            //FileManagment.result = this.result;
            callback(this.result);
            
           /* chrome.syncFileSystem.getFileStatus(FileManagment.file, function(fs)
            {
              notifyMe(fs);
            });
            
            chrome.syncFileSystem.getServiceStatus(function(ss){
              notifyMe(ss);
            }); */
          };
        
          reader.readAsText(fileObject);
        });
      });
  });
};

/**/
FileManagment.addToTemporary = function(element, callback){
  FileManagment.temporaryResult += element;
  if(callMeAfter == 0){
    callback(FileManagment.temporaryResult);
    FileManagment.temporaryResult = "";
  }
};

/**/
FileManagment.getCurrentFileName = function(){
  var today = new Date();
  return today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString() + ".dat";
};

/**/
chrome.syncFileSystem.requestFileSystem(function(fs){
  
  fs.root.getFile("data.txt", {create: true}, function(fileEntry){
    
    FileManagment.file = fileEntry;
    
  });
});