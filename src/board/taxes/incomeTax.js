var Tax = require('./tax'),
    inherits = require('util').inherits;

function IncomeTax() {
  // flat tax as default will handle 10% option on landing action
  this.taxAmount = 200;
}

inherits(IncomeTax, Tax);

IncomeTax.prototype.performLandingAction = function(player) {
  // todo: this.taxAmount = min(200, player.playerAssetValues*.10);
  IncomeTax.super_.prototype.performLandingAction.call(this, player);
};

module.exports = IncomeTax;
