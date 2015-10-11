var Space = require('../board/space'),
    inherits = require('util').inherits;

function FreeParking() {
    this.name = "Free Parking";
};

inherits(FreeParking, Space);

FreeParking.prototype.performLandingAction = function(player) {
  // nothing!
  FreeParking.super_.prototype.performLandingAction.call(this, player);

};

module.exports = FreeParking;
