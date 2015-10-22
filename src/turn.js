require("./board/boardConstants.js");
var Property = require("./board/properties/property.js");


function Turn() {
  this.lastState = -1;
};

Turn.prototype.setState = function(state, game) {
  this.lastState = game.state;
  game.state = state;
};

// setup btns
Turn.prototype.buttonPressed = function(yesPressed, game) {
  console.log("here!");
  this.runStateMachine(yesPressed, game);
};


module.exports = Turn;
