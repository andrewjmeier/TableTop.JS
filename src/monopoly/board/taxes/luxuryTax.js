var Tax = require('./tax'),
    inherits = require('util').inherits;

function LuxuryTax() {
  this.name = "Luxury Tax";
  this.taxAmount = 75;
};

inherits(LuxuryTax, Tax);

LuxuryTax.prototype.performLandingAction = function(game) {
  return LuxuryTax.super_.prototype.performLandingAction.call(this, game);
};

module.exports = LuxuryTax;
