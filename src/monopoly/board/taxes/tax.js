var Space = require('../board/space'),
    inherits = require('util').inherits;

function Tax() {
  this.taxAmount = 0; // give default value of 0, should be overridden
}

inherits(Tax, Space);

Tax.prototype.performLandingAction = function(game) {
  // should probably refactor this into a fn
  // that checks balance, prompts player to mortage/sell
  // before declaring him bankrupt
  var actions = Tax.super_.prototype.performLandingAction.call(this, game);
  actions[0] = actions[0].concat(" You payed a tax of $" + this.taxAmount + ". ");
  game.getCurrentPlayer().makePayment(this.taxAmount);
  return actions;
};

module.exports = Tax;
