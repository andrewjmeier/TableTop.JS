var Space = require('../board/space'),
    inherits = require('util').inherits;

function FreeParking() {
    this.name = "Free Parking";
};

inherits(FreeParking, Space);

FreeParking.prototype.performLandingAction = function(game) {
  return FreeParking.super_.prototype.performLandingAction.call(this, game);
};

module.exports = FreeParking;
