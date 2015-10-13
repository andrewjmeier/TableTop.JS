var Space = require('../board/space'), 
    inherits = require('util').inherits;

function CommunityChest() {}

inherits(CommunityChest, Space);

CommunityChest.prototype.performLandingAction = function(player) { 
  // todo 
  // see above chance() 
}; 

module.exports = CommunityChest;
