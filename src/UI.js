
function UI() {};

UI.prototype.displayPrompt = function(promptString) {
    var prompt = document.getElementById("prompt");
    prompt.innerHTML = "";
    prompt.innerHTML = promptString;

};
UI.prototype.changeToContinue = function() {
	var yesBtn = document.getElementById('btnYes');
	yesBtn.style.visibility = 'hidden';
	var noBtn = document.getElementById('btnNo');
	noBtn.style.visibility = 'hidden';
	var continueBtn = document.getElementById('btnContinue');
	continueBtn.style.visibility = 'visible';
};
UI.prototype.changeToYesNo = function() {
	var yesBtn = document.getElementById('btnYes');
	yesBtn.style.visibility = 'visible';
	var noBtn = document.getElementById('btnNo');
	noBtn.style.visibility = 'visible';
	var continueBtn = document.getElementById('btnContinue');
	continueBtn.style.visibility = 'hidden';
};




module.exports = UI;