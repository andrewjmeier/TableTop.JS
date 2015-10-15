var Space = require('../board/space'),
    inherits = require('util').inherits;

function GoToJail() {
  this.name = "Go to Jail";
};

inherits(GoToJail, Space);

GoToJail.prototype.performLandingAction = function(game) {
  game.getCurrentPlayer().sendToJail();
  GoToJail.super_.prototype.performLandingAction.call(this, game);
};

module.exports = GoToJail;
