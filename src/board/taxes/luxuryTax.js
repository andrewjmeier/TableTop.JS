var Tax = require('./tax'), 
    inherits = require('util').inherits;

function LuxuryTax() { 
  this.taxAmount = 75;
}

inherits(LuxuryTax, Tax);

LuxuryTax.prototype.performLandingAction = function(player) { 
  LuxuryTax.super_.prototype.performLandingAction.apply(this);
}; 

module.exports = LuxuryTax;
