var Space = require('../board/space'),
    inherits = require('util').inherits;

function Jail() {
    this.name = "Jail";
};

inherits(Jail, Space);

Jail.prototype.performLandingAction = function(game) {
    Jail.super_.prototype.performLandingAction.call(this, game);
};

module.exports = Jail;
