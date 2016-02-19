var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function FreeParking() {
    MonopolyTile.call(this, "Free Parking");
};

inherits(FreeParking, MonopolyTile);

FreeParking.prototype.performLandingAction = function(game) {
  return FreeParking.super_.prototype.performLandingAction.call(this, game);
};

module.exports = FreeParking;
