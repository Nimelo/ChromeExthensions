
/**/
function HistoryEntry(url){

	/**/
	this.url = url;
	
	/**/
	this.domain = HistoryEntry.getDomain(url);
	/**/
	this.counter = 0;
	
	/**/
	this.actions = new List();
	
		
	/**/	
	this.compare = function(toCompare){	
		return this.domain == toCompare.domain;
	};
	
}

HistoryEntry.getDomain = function(url){
		var domain;
		
		//find & remove protocol (http, ftp, etc.) and get domain
		if (url.indexOf("://") > -1) {
			domain = url.split('/')[2];
		}
		else {
			domain = url.split('/')[0];
		}

		//find & remove port number
		domain = domain.split(':')[0];

		return domain;
	};
	
HistoryEntry.fromString = function(str){
  var list = new List();
  var splittedStr = str.split('\n');
  var index = 0;
  
  while(index < splittedStr.length - 1
        && splittedStr[index] != '\n'){
          var histEntry = new HistoryEntry(splittedStr[index])
          list.addDistinct(histEntry);
          list.get(histEntry).counter += Number(splittedStr[index + 1]);
          index += 2;
        }
  return list;
}

/*List*/
function List(){

	/**/
	this.items = [];
	
	
	/**/
	this.length = function(){
		return this.items.length;
	};
	
	/**/
	this.add = function(item){
		this.items.push(item);
	};
	
	/**/
	this.addDistinct = function(item){			
		if(this.exist(item) == false)
			this.add(item);				
	};

	/**/
	this.exist = function(item){
		var exst = false;
			
			this.items.every(function(element, index, array){
				exst = element.compare(item) ? true : false;
						if(exst == true) 
							return false;
						else
							return true;
				}
			);
		return exst;
	};
		
	/**/
	this.del = function(item){
		
		for(var i = this.items.length - 1; i >= 0; i--) {
			if(this.items[i].compare(item)) {
				this.items.splice(i, 1);
			}
		}
		
	};
	
	/**/
	this.get = function(item){
		for(var i = this.items.length - 1; i >= 0; i--) {
			if(this.items[i].compare(item)) {
				return this.items[i];
			}
		}
	};
	
	/**/
	this.last = function(){
		return this.items[ this.items.length - 1];
	};

	/**/
	this.clear = function(){
	  this.items = [];
	};
	
	/**/
	this.toString = function(){
	  var text = "";
	  this.items.forEach(function(el){
	    text += el.toString() + "\n";
	    });
	 return text;
	};
}

/*Core*/
function Core(windowId){
  this.lastTabId = -1;
  this.lastTabUrl = "";
  this.lastTabBegin = 'undefined';
  this.windowId = windowId;
  
  this.prepareMessage = function(callback){
    if(this.lastTabId != -1){
      var text = this.lastTabUrl + "\n";
      var timespan = Math.floor((new Date() - this.lastTabBegin) / 1000);
    	text += timespan;
    	//console.log(text);
    	//console.log(timespan);
      //Extension.history.addDistinct(new HistoryEntry(this.lastTabUrl));
    	//Extension.history.get(new HistoryEntry(this.lastTabUrl)).counter += timespan;
    	if(timespan != 0)
    	  callback(text);
    }
  };
  
  this.clear = function(){
    this.lastTabId = -1;
		this.lastTabUrl = "";
		this.lastBegin = "undefined";
  };
  
  this.compare = function(toCompare){
    return (this.windowId == toCompare);
  };
  
}