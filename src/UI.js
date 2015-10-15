
function UI() {};

UI.prototype.displayPrompt = function(promptString) {
    var btnPressed = false;
    var prompt = document.getElementById("prompt");
    prompt.innerHTML = "";
    prompt.innerHTML = promptString;

};


module.exports = UI;