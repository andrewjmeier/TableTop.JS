var Tile = require('./tile'),
    inherits = require('util').inherits;

function VertexTile() {
  Tile.call(this);
  this.edges = [];
}

inherits(VertexTile, Tile);

VertexTile.prototype.addEdge = function(edge, position) {
    this.edges[position] = edge;
};

module.exports = VertexTile;
