var SettlersVertexTile = require('./settlers_vertex_tile'),
    SettlersEdgeTile = require('./settlers_edge_tile'),
    inherits = require('util').inherits;

function SettlersVertexRightTile() {
  SettlersVertexTile.call(this);
  this.upIndex = 0;
  this.rightIndex = 1;
  this.downIndex = 2;
};

inherits(SettlersVertexRightTile, SettlersVertexTile);

// \
//  \
//   \
//    \
//     X---------
//    /
//   /
//  /
// /

// We will draw the board as illustrated above.
// Each vertex has three (at most) adjacent edges
// There's an edge to the right, an edge up and an edge down
// They adjacent edges array will store these in order
// Up -> 0
// Right -> 1
// Down -> 2


// Each vertex has a possibility of having three hex tiles associated with it
// The tiles are the opposite of the edges. They could be
// Left -> 0
// Up -> 1
// Down -> 2

// To create the edges, call this function with an array of length 3.
// Should be in the format [topVertex, rightVertex, bottomVertex] or
// [topVertex, null, bottomVertex] in the event that there is no right vertex
SettlersVertexRightTile.prototype.addVerticies = function(verticiesList) {
  this.addTopVertex(verticiesList[0]);
  this.addRightVertex(verticiesList[1]);
  this.addBottomVertex(verticiesList[2]);
}

SettlersVertexRightTile.prototype.addTopVertex = function(otherVertex) {
  if (otherVertex) {
    var edge = new SettlersEdgeTile(this, otherVertex);
    this.addEdge(edge, 0);
    otherVertex.addEdge(edge, otherVertex.downIndex);
  }
};

SettlersVertexRightTile.prototype.addRightVertex = function(otherVertex) {
  if (otherVertex) {
    var edge = new SettlersEdgeTile(this, otherVertex);
    this.addEdge(edge, 1);
    otherVertex.addEdge(edge, otherVertex.leftIndex);
  }
};

SettlersVertexRightTile.prototype.addBottomVertex = function(otherVertex) {
  if (otherVertex) {
    var edge = new SettlersEdgeTile(this, otherVertex);
    this.addEdge(edge, 2);
    otherVertex.addEdge(edge, otherVertex.upIndex);
  }
};

module.exports = SettlersVertexRightTile;
