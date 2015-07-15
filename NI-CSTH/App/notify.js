
function notifyMe(text) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification('Notification title', {
     // icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: text,
    });

    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");      
    };

  }

}

var counter = 0;
function StartNotification(){
  setInterval(notifyMe, 1000);
}

