
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
	  str += this.actions.items.length + "\n";
	  this.actions.items.forEach(function(el){
	    str += el.toString() + "\n"; 
	  });
	  
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
	this.clear = function(){
	  this.items = [];
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
	
	/*EXTENDED AND ONLY FOR TESTS */
	/**/
	this.getDomains = function(){
		this.items.forEach(function(it){
				console.log(it.domain());
			}
		);
	};
	
	/**/
	this.getDiffs = function(){
		var ar = [];
		this.items.forEach(function(it){
				var obj = {};
				obj["url"] = it.url;
				obj["diff"] = it.allDiffs();
				ar.push(obj);
				
				console.log(it.url + " " + it.allDiffs());				
			}
		);
		return ar;
	};
	
	/**/
	this.toString = function(){
	  var str = "";
	  
	  this.items.forEach(function(el){
	    str += el.toString();
	  });
	  
	  return str;
	};
	
	/**/
	this.fromString = function(str){
	  this.clear();
	  
	  var splittedStr = str.split('\n');
	  var index = 0;
	  var length = splittedStr.length;
	  
	  while(index < length && splittedStr[index] != ""){
	    var newTab = new NTab(splittedStr[index]);
	    index++;
	    this.addDistinct(newTab);
	    
	    var currentObject = this.get(newTab);
	    
	    var amountOfTimespans = splittedStr[index];
	    index++;
	    
	    for(i = 0; i < amountOfTimespans; i++){
	      var timespan = splittedStr[index];
	      
	      var begin = timespan.split(',')[0];
	      var end = timespan.split(',')[1];
	      
	      var ts = new Timespan(new Date(begin));
	      ts.end = new Date(end);
	      
	      currentObject.actions.add(ts);
	      
	      
	      index++;
	    }
	  }
	};
}

/**/
function NWindow(id){
	
	/**/
	this.id = id;
	
	/**/
	this.isActive = false;
	
	/**/
	this.compare = function(toCompare){	
		return this.id == toCompare.id ? true : false;
	};
}