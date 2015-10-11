var Space = require('../board/space'),
    inherits = require('util').inherits;

function CommunityChest() {
    this.name = "Community Chest";
};

inherits(CommunityChest, Space);

CommunityChest.prototype.performLandingAction = function(player) {
  // todo
  // see above chance()
  CommunityChest.super_.prototype.performLandingAction.call(this, player);

};

module.exports = CommunityChest;
