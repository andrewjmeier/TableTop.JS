var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function Jail() {
  MonopolyTile.call(this, "Jail");
};

inherits(Jail, MonopolyTile);

Jail.prototype.performLandingAction = function(game) {
  return Jail.super_.prototype.performLandingAction.call(this, game);
};

module.exports = Jail;
