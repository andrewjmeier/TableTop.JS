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
  this.taxAmount = Math.min(200, game.getCurrentPlayer().assets()*.10);
  return IncomeTax.super_.prototype.performLandingAction.call(this, game);
};

module.exports = IncomeTax;
