var VertexTile = require('../../board/vertex_tile'),
    inherits = require('util').inherits;

function SettlersVertexTile(isUp) {
  VertexTile.call(this);
  this.settlement = null;   // starts w/out a settlement

  this.edges = [null, null, null];  // init w/ three empty edges;
  this.tiles = [null, null, null];  // init w/ three empty hex tiles
};

inherits(SettlersVertexTile, VertexTile);

module.exports = SettlersVertexTile;
