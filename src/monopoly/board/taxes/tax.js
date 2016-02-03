var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function Tax(name, amount) {
  MonopolyTile.call(this, name);
  this.taxAmount = amount; // give default value of 0, should be overridden
}

inherits(Tax, MonopolyTile);

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
