var Space = require('../board/space'),
    inherits = require('util').inherits;

function Chance() {
    this.name = "Chance";
};

inherits(Chance, Space);

Chance.prototype.performLandingAction = function(game) {
  var spaceActions = Chance.super_.prototype.performLandingAction.call(this, game);
  var chanceActions = game.drawChanceCard();
  var actions = [];
  actions[0] = spaceActions[0].concat(chanceActions[0]);
  actions[1] = chanceActions[1];
  return actions;
};

module.exports = Chance;
