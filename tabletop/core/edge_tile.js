var Tile = require('./tile'),
    inherits = require('util').inherits;

function EdgeTile(start, end) {
  Tile.call(this);
  this.startVertex = start;
  this.endVertex = end;
}

inherits(EdgeTile, Tile);

module.exports = EdgeTile;