var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function Chance() {
    MonopolyTile.call(this, "Chance");
};

inherits(Chance, MonopolyTile);

Chance.prototype.performLandingAction = function(game) {
  var spaceActions = Chance.super_.prototype.performLandingAction.call(this, game);
  var nextState = game.drawChanceCard();
  return nextState;
};

module.exports = Chance;
