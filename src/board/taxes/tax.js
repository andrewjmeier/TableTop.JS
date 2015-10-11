var Space = require('../board/space'),
    inherits = require('util').inherits;

function Tax() {
  this.taxAmount = 0; // give default value of 0, should be overridden
}

inherits(Tax, Space);

Tax.prototype.performLandingAction = function(player) {
  // should probably refactor this into a fn
  // that checks balance, prompts player to mortage/sell
  // before declaring him bankrupt
  player.makePayment(this.taxAmount);
  Tax.super_.prototype.performLandingAction.call(this, player);

};

module.exports = Tax;
