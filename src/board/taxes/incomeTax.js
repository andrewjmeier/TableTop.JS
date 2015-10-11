var Tax = require('./tax'),
    inherits = require('util').inherits;

function IncomeTax() {
  this.name = "Income Tax";
  // flat tax as default will handle 10% option on landing action
  this.taxAmount = 200;
}

inherits(IncomeTax, Tax);

IncomeTax.prototype.performLandingAction = function(game) {
  // todo: this.taxAmount = min(200, player.playerAssetValues*.10);
  IncomeTax.super_.prototype.performLandingAction.call(this, game);
};

module.exports = IncomeTax;
