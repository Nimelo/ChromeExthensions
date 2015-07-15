
/**/
function FileManagment(){
}

/**/
FileManagment.file = "";

/**/
FileManagment.result = "";

/**/
FileManagment.writeData = function (data){
    
    FileManagment.file.createWriter(function(writer){
      
      writer.onwriteend = function(e){
        
        console.log("Write completed!");
        
      };
      
      writer.onerror = function(e){
       
        console.log(e);
        
      };
     
      writer.truncate(0);
      
    });
    
    FileManagment.file.createWriter(function(writer){
      
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
};
    
/**/
FileManagment.readData = function (callMeAfter){
    
    FileManagment.file.file(function(fileObject){
      
      var reader = new FileReader();
      
      reader.onloadend = function(e){
        
        FileManagment.result = this.result;
        callMeAfter(this.result);
        
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
  };


/**/
chrome.syncFileSystem.requestFileSystem(function(fs){
  
  fs.root.getFile("data.txt", {create: true}, function(fileEntry){
    
    FileManagment.file = fileEntry;
    
  });
});

