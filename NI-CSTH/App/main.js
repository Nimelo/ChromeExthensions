window.onload = function() {

};
// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
    
  var link = document.getElementById('notifyme');
    // onClick's logic below:
    link.addEventListener('click', function() {
        notifyMe();
    });
    
});
