var Space = require('../board/space'),
    inherits = require('util').inherits;

function Chance() {
    this.name = "Chance";
};

inherits(Chance, Space);

Chance.prototype.performLandingAction = function(player) {
  // todo
  // call function relating to chance cards
  Chance.super_.prototype.performLandingAction.call(this, player);

};

module.exports = Chance;
