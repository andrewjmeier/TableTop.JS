var Space = require('../board/space'),
    inherits = require('util').inherits;

function Go() {
    this.name = "Go";
};

inherits(Go, Space);

Go.prototype.performLandingAction = function(player) {
  // nothing!
  Go.super_.prototype.performLandingAction.call(this, player);

};


module.exports = Go;

