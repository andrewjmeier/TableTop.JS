var Space = require('../board/space'),
    inherits = require('util').inherits;

function Chance() {
    this.name = "Chance";
};

inherits(Chance, Space);

Chance.prototype.performLandingAction = function(game) {
  // todo
  // call function relating to chance cards
  game.drawChanceCard();
  Chance.super_.prototype.performLandingAction.call(this, game);
};

module.exports = Chance;
