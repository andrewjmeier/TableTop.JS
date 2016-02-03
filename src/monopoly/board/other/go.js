var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function Go() {
    MonopolyTile.call(this, "Go");
};

inherits(Go, MonopolyTile);

Go.prototype.performLandingAction = function(game) {
  return Go.super_.prototype.performLandingAction.call(this, game);
};

module.exports = Go;

