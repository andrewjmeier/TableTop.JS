var Space = require('../board/space'), 
    inherits = require('util').inherits;

function Jail() {}

inherits(Jail, Space);

Jail.prototype.performLandingAction = function(player) { 
}; 

module.exports = Jail;
