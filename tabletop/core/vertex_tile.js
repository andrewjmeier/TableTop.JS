var Tile = require('./tile');
var inherits = require('util').inherits;

/**
 * The VertexTile class
 * @constructor
 * @extends {Tile}
*/
function VertexTile() {
  Tile.call(this);
  this.edges = [];
}

inherits(VertexTile, Tile);

/**
 * Add an edge to the vertex to connect to another vertex
 * @param {EdgeTile} edge - edge tile to another vertex tile
 * @param {int} position - index in the list of edges for the tile
*/
VertexTile.prototype.addEdge = function(edge, position) {
    this.edges[position] = edge;
};

module.exports = VertexTile;
