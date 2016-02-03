var MonopolyTile = require('../monopoly_tile'),
    inherits = require('util').inherits;

function CommunityChest() {
    MonopolyTile.call(this, "Community Chest");
};

inherits(CommunityChest, MonopolyTile);

CommunityChest.prototype.performLandingAction = function(game) {
  var spaceActions = CommunityChest.super_.prototype.performLandingAction.call(this, game);
  var ccActions = game.drawCommunityChestCard();
  var actions = [];
  actions[0] = spaceActions[0].concat(ccActions[0]);
  actions[1] = ccActions[1];
  return actions;
};

module.exports = CommunityChest;
