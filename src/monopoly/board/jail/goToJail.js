var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function GoToJail() {
  MonopolyTile.call(this, "Go to Jail");
};

inherits(GoToJail, MonopolyTile);

GoToJail.prototype.performLandingAction = function(game) {
  var player = game.getCurrentPlayer();
  game.sendToJail(player);
  var nextState = GoToJail.super_.prototype.performLandingAction.call(this, game);
  var message = player.name + " has been sent to Jail";
  this.sendMessage(message);
  return nextState;
};

module.exports = GoToJail;
