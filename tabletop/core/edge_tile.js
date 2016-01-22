var Tile = require('./tile'),
    inherits = require('util').inherits;

/**
 * The EdgeTile class
 * @constructor
 * @param {VertexTile} start - Vertex on one side of the edge
 * @param {VertexTile} end - Vertex on the other side of the edge
 * @extends {Tile}
*/
function EdgeTile(start, end) {
  Tile.call(this);
  this.startVertex = start;
  this.endVertex = end;
}

inherits(EdgeTile, Tile);

module.exports = EdgeTile;