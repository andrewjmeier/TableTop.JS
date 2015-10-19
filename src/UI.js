
function UI() {};

UI.prototype.displayPrompt = function(promptString) {
  document.getElementById("prompt").innerHTML = promptString;
};

UI.prototype.changeToContinue = function() {
  
  ['btnYes', 'btnNo'].forEach(function(id) { 
    document.getElementById(id).style.visibility = 'hidden'; 
  });
  
  document.getElementById('btnContinue').style.visibility = 'visible';
};

UI.prototype.changeToYesNo = function() {
  
  ['btnYes', 'btnNo'].forEach(function(id) { 
    document.getElementById(id).style.visibility = 'visible';
  });
  
  document.getElementById('btnContinue').style.visibility = 'hidden';
};

module.exports = UI;
