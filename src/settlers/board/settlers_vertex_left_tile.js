var SettlersVertexTile = require('./settlers_vertex_tile'),
    SettlersEdgeTile = require('./settlers_edge_tile'),
    inherits = require('util').inherits;

function SettlersVertexLeftTile() {
  SettlersVertexTile.call(this);
  this.leftIndex = 0;
  this.upIndex = 1;
  this.downIndex = 2;
};

inherits(SettlersVertexLeftTile, SettlersVertexTile);

//            /
//           /
//          /
// --------X
//          \
//           \
//            \
//             \

// We will draw the board as illustrated above.
// Each vertex has three (at most) adjacent edges
// There's an edge to the left, an edge up, and an edge down
// They adjacent edges array will store these in order
// Left -> 0
// Up -> 1
// Down -> 2

// Each vertex has a possibility of having three hex tiles associated with it
// The tiles are the opposite of the edges. They could be
// Up -> 0
// Right -> 1
// Down -> 2

// To create the edges, call this function with an array of length 3.
// Should be in the format [leftVertex, topVertex, bottomVertex] or
// [leftVertex, null, bottomVertex] in the event that there is no right vertex
SettlersVertexLeftTile.prototype.addVerticies = function(verticiesList) {
  this.addLeftVertex(verticiesList[0]);
  this.addTopVertex(verticiesList[1]);
  this.addBottomVertex(verticiesList[2]);
};

SettlersVertexLeftTile.prototype.addLeftVertex = function(otherVertex) {
  if (otherVertex) {
    var edge = new SettlersEdgeTile(this, otherVertex);
    this.addEdge(edge, this.leftIndex);
    otherVertex.addEdge(edge, otherVertex.rightIndex);
  }
};

SettlersVertexLeftTile.prototype.addTopVertex = function(otherVertex) {
  if (otherVertex) {
    var edge = new SettlersEdgeTile(this, otherVertex);
    this.addEdge(edge, this.upIndex);
    otherVertex.addEdge(edge, otherVertex.downIndex);
  }
};

SettlersVertexLeftTile.prototype.addBottomVertex = function(otherVertex) {
  if (otherVertex) {
    var edge = new SettlersEdgeTile(this, otherVertex);
    this.addEdge(edge, this.downIndex);
    otherVertex.addEdge(edge, otherVertex.upIndex);
  }
};

module.exports = SettlersVertexLeftTile;
