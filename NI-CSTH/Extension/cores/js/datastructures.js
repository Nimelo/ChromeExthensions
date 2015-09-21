Number.prototype.padLeft = function(base,chr){
   var  len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
};

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
  var index = 1;
  
  while(index < splittedStr.length - 1
        && splittedStr[index] != '\n'){
          var histEntry = new HistoryEntry(splittedStr[index + 1])
          list.addDistinct(histEntry);
          list.get(histEntry).counter += Number(splittedStr[index + 2]);
          index += 4;
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
	this.elementAt = function(index){
	  return this.items[index];
	}
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
  
  this.convertLogDate = function(date){
    return [ (this.pad(date.getDate(),2)),
              this.pad(date.getMonth() + 1,2),
              date.getFullYear()].join('.')+
              ' ' +
            [ this.pad(date.getHours(),2),
              this.pad(date.getMinutes(),2),
              this.pad(date.getSeconds(),2)].join(':');
  };
  
  this.prepareMessage = function(callback){
    if(this.lastTabId != -1){
      var today = new Date();
      var text = this.convertLogDate(today) + "\n";
      text += this.lastTabUrl + "\n";
      var timespan = Math.floor((today - this.lastTabBegin) / 1000);
    	text += timespan;
    	text += "\n" + this.convertLogDate(this.lastTabBegin)
    	
    	console.log(text);
    	if(timespan != 0)
    	  callback(text);
    }
  };
  
  this.pad = function(str, max) {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
  };
  
  this.clear = function(){
    this.lastTabId = -1;
		this.lastTabUrl = "";
		this.lastTabBegin = "undefined";
  };
  
  this.compare = function(toCompare){
    return (this.windowId == toCompare.windowId);
  };
  
};