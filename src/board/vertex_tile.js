var Tile = require('./tile'),
    inherits = require('util').inherits;

function VertexTile() {
  Tile.call(this);
  this.edges = [];
};

inherits(VertexTile, Tile);

VertexTile.prototype.addEdge = function(edge, position) {

  // Allow the ability to specifiy a certain index in the array (index 0 could be vertex to the left)
  if (position) {
    this.edges[position] = edge;
  } else {
    this.edges.push(edge);
  }
};

module.exports = VertexTile;
