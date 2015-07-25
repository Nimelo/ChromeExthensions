function Socketing(serviceUrl){
  
  this.socket = 'undefined';
  
  this.serviceUrl = serviceUrl;
  
  this.init = function(){
    var that = this;
    this.socket = new WebSocket(this.serviceUrl);
    
    this.socket.onopen = function () {
          console.log('Connection Established!');
          clearInterval(this.reconnectIntervalId);
    };
 
    this.socket.onclose = function () {
        console.log('Connection Closed!');
        Socketing.socket = 'undefined';
        console.log(that);
        that.reconnectIntervalId = setInterval(function(){
          that.reconnect();
        }, 1000);
    };
  
    this.socket.onerror = function (error) {
        console.log('Error Occured: ' + error);
    };
  
    this.socket.onmessage = function (e) {
       console.log(e);
    };
  };
  
  this.reconnect = function(){
    if(typeof(this.socket) == 'undefined' || this.socket.readyState > 1){
      this.init();
    } 
  };
  
   this.reconnectIntervalId = setInterval(this.reconnect, 1000);
}
