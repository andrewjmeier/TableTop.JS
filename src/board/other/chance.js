var Space = require('../board/space'), 
    inherits = require('util').inherits;

function Chance() {} 

inherits(Chance, Space);

Chance.prototype.performLandingAction = function(player) { 
  // todo 
  // call function relating to chance cards
}; 

module.exports = Chance;
