var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function Chance() {
    MonopolyTile.call(this, "Chance");
};

inherits(Chance, MonopolyTile);

Chance.prototype.performLandingAction = function(game) {
  var spaceActions = Chance.super_.prototype.performLandingAction.call(this, game);
  var chanceActions = game.drawChanceCard();
  this.sendMessage(chanceActions[0]);
  var actions = [];
  actions[0] = spaceActions[0].concat(chanceActions[0]);
  actions[1] = chanceActions[1];
  return actions;
};

module.exports = Chance;
