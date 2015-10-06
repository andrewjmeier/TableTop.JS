var Tax = require('./tax'), 
    inherits = require('util').inherits;

function LuxuryTax() { 
  this.taxAmount = 75;
}

inherits(LuxuryTax, Tax);

LuxuryTax.prototype.performLandingAction = function(player) { 
  // todo
}; 

module.exports = LuxuryTax;
