var VertexTile = require('../../board/vertex_tile'),
    inherits = require('util').inherits;

function SettlersVertexTile(isUp) {
  VertexTile.call(this);
  this.settlement = null;   // starts w/out a settlement

  this.edges = [null, null, null];  // init w/ three empty edges;
  this.tiles = [null, null, null];  // init w/ three empty hex tiles
};

inherits(SettlersVertexTile, VertexTile);

SettlersVertexTile.prototype.canBuild = function(player) {
  var hasRoad = false;
  for (var i in this.edges) {
    var edge = this.edges[i];
    var road = edge ? edge.road : null;
    if (road && road.player === player) {
      hasRoad = true;
    }
    if (edge) {
      var otherVertex = edge.startVertex === this ? edge.endVertex : edge.startVertex;
      if (otherVertex.settlement) {
        // Can't build a settlement adjacent to another settlement
        return false;
      }
    }
  }
  return !this.settlement && hasRoad;    // can't build if there's already a settlement
};

SettlersVertexTile.prototype.addSettlement = function(settlement) {
  this.settlement = settlement;
};

module.exports = SettlersVertexTile;