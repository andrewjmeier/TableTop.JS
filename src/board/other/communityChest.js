var Space = require('../board/space'),
    inherits = require('util').inherits;

function CommunityChest() {
    this.name = "Community Chest";
};

inherits(CommunityChest, Space);

CommunityChest.prototype.performLandingAction = function(game) {
  // todo
  // see above chance()
  game.drawCommunityChestCard();
  CommunityChest.super_.prototype.performLandingAction.call(this, game);
};

module.exports = CommunityChest;
