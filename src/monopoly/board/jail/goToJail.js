var Space = require('../board/space'),
    inherits = require('util').inherits;

function GoToJail() {
  this.name = "Go to Jail";
};

inherits(GoToJail, Space);

GoToJail.prototype.performLandingAction = function(game) {
  game.getCurrentPlayer().sendToJail();
  var actions = GoToJail.super_.prototype.performLandingAction.call(this, game);
  actions[0] = actions[0].concat(" You've been sent to Jail");
  return actions;
};

module.exports = GoToJail;
