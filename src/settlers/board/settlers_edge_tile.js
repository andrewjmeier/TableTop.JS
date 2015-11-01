var EdgeTile = require('../../board/edge_tile'),
    inherits = require('util').inherits;

function SettlersEdgeTile(start, end) {
  EdgeTile.call(this, start, end);
  this.road = null;   // starts w/out a road

  this.leftTile = null;
  this.rightTile = null;
};

inherits(SettlersEdgeTile, EdgeTile);


//      /\
//     /  \
//    /    \
//   /      \
//  /        \
// |          |
// |          |
// |          |
// |          |
// |          |
//  \        /
//   \      /
//    \    /
//     \  /
//      \/

// Here's a poor rough example of one of the hex tiles
// Each edge has an obvious left and right side.



module.exports = SettlersEdgeTile;
