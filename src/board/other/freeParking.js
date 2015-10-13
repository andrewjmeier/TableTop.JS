var Space = require('../board/space'), 
    inherits = require('util').inherits;

function FreeParking() {}

inherits(FreeParking, Space);

FreeParking.prototype.performLandingAction = function(player) { 
  // nothing! 
}; 

module.exports = FreeParking;
