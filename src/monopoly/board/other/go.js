var Space = require('../board/space'),
    inherits = require('util').inherits;

function Go() {
    this.name = "Go";
};

inherits(Go, Space);

Go.prototype.performLandingAction = function(game) {
  return Go.super_.prototype.performLandingAction.call(this, game);
};

module.exports = Go;

