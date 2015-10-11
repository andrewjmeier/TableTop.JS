var Space = require('../board/space'),
    inherits = require('util').inherits;

function Jail() {}

inherits(Jail, Space);

Jail.prototype.performLandingAction = function(player) {
    Jail.super_.prototype.performLandingAction.call(this, player);
};

module.exports = Jail;
