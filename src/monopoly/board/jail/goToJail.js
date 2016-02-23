var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function GoToJail() {
  MonopolyTile.call(this, "Go to Jail");
};

inherits(GoToJail, MonopolyTile);

GoToJail.prototype.performLandingAction = function(game) {
  var player = game.getCurrentPlayer();
  game.sendToJail(player);
  var actions = GoToJail.super_.prototype.performLandingAction.call(this, game);
  actions[0] = actions[0].concat(" You've been sent to Jail");
  return actions;
};

module.exports = GoToJail;
