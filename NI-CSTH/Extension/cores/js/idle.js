/**/
function Idle(){
  
}

/**/
Idle.detectionInterval = 15;

/**/

/**/
chrome.idle.onStateChanged.addListener(function(idleStatus){
  console.log(idleStatus);
  switch(idleStatus){
    case "active":
      ChangeOnActive();
      break;
    case "idle":
      ChangeOnIdle();
      break;
    case "locked":
      ChangeOnIdle();
      break;
      default:
      
  }
});

/**/
chrome.idle.setDetectionInterval(Idle.detectionInterval);

function ChangeOnIdle(){
  Extension.idle = true;
  SendLast();
}

function ChangeOnActive(){
  Extension.idle = false;
  NoteNew();
}