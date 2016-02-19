var Tax = require('./tax'),
    inherits = require('util').inherits;

function LuxuryTax() {
  Tax.call(this, "LuxuryTax", 75);
};

inherits(LuxuryTax, Tax);

LuxuryTax.prototype.performLandingAction = function(game) {
  return LuxuryTax.super_.prototype.performLandingAction.call(this, game);
};

module.exports = LuxuryTax;
