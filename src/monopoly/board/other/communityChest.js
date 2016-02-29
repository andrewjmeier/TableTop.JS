var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function CommunityChest() {
    MonopolyTile.call(this, "Community Chest");
};

inherits(CommunityChest, MonopolyTile);

CommunityChest.prototype.performLandingAction = function(game) {
  var spaceActions = CommunityChest.super_.prototype.performLandingAction.call(this, game);
  var nextState = game.drawCommunityChestCard();
  return nextState;
};

module.exports = CommunityChest;
