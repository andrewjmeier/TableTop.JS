var Space = require('../board/space'), 
    inherits = require('util').inherits;

function GoToJail() {}

inherits(GoToJail, Space);

GoToJail.prototype.performLandingAction = function(player) { 
  player.sendToJail();
}; 

module.exports = GoToJail;
