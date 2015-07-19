
/*Informtion about Tab*/

function NTab(url){

	/**/
	this.url = url;
	
	/**/
	this.counter = 0;
	
	/**/
	this.actions = new List();
	
	/**/
	this.domain = function(){
		var domain;
		
		//find & remove protocol (http, ftp, etc.) and get domain
		if (this.url.indexOf("://") > -1) {
			domain = this.url.split('/')[2];
		}
		else {
			domain = this.url.split('/')[0];
		}

		//find & remove port number
		domain = domain.split(':')[0];

		return domain;
	};
		
	/**/	
	this.compare = function(toCompare){	
		return this.url == toCompare.url ? true : false;
	};
	
	/**/
	this.printActions = function(){
			console.log(this.url);
		this.actions.items.forEach(function(element, index, array){
				element.print();
			}
		);
	};
	
	/**/
	this.allDiffs = function(){
		var sum = 0;
		this.actions.items.forEach(function(element, index, array){
				sum += element.diff();
			}
		);
		return sum;
	};
	
	/**/
	this.toString = function(){
	  var str = this.url + "\n";
	  str += this.counter + "\n";
	  return str;
	};
}

/*Timespan*/
function Timespan(begin){

	/**/
	this.begin = begin;
	
	/**/
	this.end = begin;
	
	/**/
	this.print = function(){
		console.log("***");
		console.log(this.begin);
		console.log(this.end);
	};
	
	/**/
	this.diff = function(){
		return Math.floor((this.end - this.begin) / 1000);
	};
	
	/**/
	this.toString = function(){
	  return this.begin.toJSON() + "," + this.end.toJSON();
	};
}



/*NList*/

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
  
  this.prepareMessage = function(){
    if(this.lastTabId != -1){
      var text = this.lastTabUrl + "\n";
    	text += "1\n";
    	text += Math.floor((new Date() - this.lastBegin) / 1000);
    	//console.log(text);
    	Extension.history.addDistinct(new NTab(this.lastTabUrl));
    	Extension.history.get(new NTab(this.lastTabUrl)).counter += Math.floor((new Date() - this.lastBegin) / 1000);
    	return text;
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