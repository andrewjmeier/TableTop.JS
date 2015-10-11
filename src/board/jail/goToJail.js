var Space = require('../board/space'),
    inherits = require('util').inherits;

function GoToJail() {
  this.name = "Go to Jail";
}

inherits(GoToJail, Space);

GoToJail.prototype.performLandingAction = function(player) {
  player.sendToJail();
  GoToJail.super_.prototype.performLandingAction.call(this, player);

};

module.exports = GoToJail;
