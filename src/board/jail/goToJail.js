var Space = require('../board/space'), 
    inherits = require('util').inherits;

function GoToJail() {}

inherits(GoToJail, Space);

GoToJail.prototype.performLandingAction = function(player) { 
  // send player to jail
}; 

module.exports = GoToJail;