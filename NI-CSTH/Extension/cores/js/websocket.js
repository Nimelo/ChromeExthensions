$(document).ready(function () {
    if ("WebSocket" in window) {
 
        console.log('WebSocket is supported by your browser.');
 
        var serviceUrl = 'ws://localhost:4649/Echo';
        var socket = new WebSocket(serviceUrl);
 
        socket.onopen = function () {
            console.log('Connection Established!');
            socket.send("Hello WebSocket!");
        };
 
        socket.onclose = function () {
            console.log('Connection Closed!');
        };
 
        socket.onerror = function (error) {
            console.log('Error Occured: ' + error);
        };
 
        socket.onmessage = function (e) {
           console.log(e);
        };
 
    }
});