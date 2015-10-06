var Tax = require('./tax'), 
    inherits = require('util').inherits;

function IncomeTax() {
  this.taxAmount = 200; // flat tax - will give user option later
}

inherits(IncomeTax, Tax);

IncomeTax.prototype.performLandingAction = function(player) { 
  // todo: prompt user for choice here
  // if (userWantsFlatTax) this.taxAmount = 200; 
  // else this.taxAmount = playerAssetValue(player)*.10;
}; 

module.exports = IncomeTax;
