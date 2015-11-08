var VertexTile = require('../../board/vertex_tile'),
    inherits = require('util').inherits;

function SettlersVertexTile(isUp) {
  VertexTile.call(this);
  this.settlement = null;   // starts w/out a settlement

  this.edges = [null, null, null];  // init w/ three empty edges;
  this.tiles = [null, null, null];  // init w/ three empty hex tiles
};

inherits(SettlersVertexTile, VertexTile);

// at the beginning of the game, road isn't required to build settlement
SettlersVertexTile.prototype.canBuild = function(player, requiresRoad) {
  var hasRoad = false;
  for (var i in this.edges) {
    var edge = this.edges[i];
    var road = edge ? edge.road : null;
    if (road && road.player === player) {
      console.log("vertex has an adjacent road to build settlement");
      hasRoad = true;
    }
    if (edge) {
      var otherVertex = edge.startVertex === this ? edge.endVertex : edge.startVertex;
      if (otherVertex.settlement) {
        // Can't build a settlement adjacent to another settlement
        console.log("can't build next to another settlement");
        return false;
      }
    }
  }

  // can't build if there's already a settlement
  if (requiresRoad) {
    return !this.settlement && hasRoad;
  } else {
    return !this.settlement;
  }
};

SettlersVertexTile.prototype.canBuildRoad = function(player, otherVertex) {
  // Need to have an adjacent road to build the new road
  var previousRoadEdge = null;
  for (var i in this.edges) {
    var edge = this.edges[i];
    console.log("edge", edge);
    if (edge && edge.road && edge.road.player === player) {
      previousRoadEdge = edge;
      break;
    }
  };

  for (var i in otherVertex.edges) {
    var edge = otherVertex.edges[i];
    console.log("edge", edge);
    if (edge && edge.road && edge.road.player === player) {
      previousRoadEdge = edge;
      break;
    }
  }

  if (!previousRoadEdge) {
    console.log("no adjacent road");
    return false;
  }

  for (var i in this.edges) {
    var edge = this.edges[i];
    if (edge) {
      if (edge.startVertex === this && edge.endVertex === otherVertex) {
        if (previousRoadEdge === edge) {
          console.log("already a road here");
          return false;
        }
      } else if (edge.endVertex === this && edge.startVertex === otherVertex) {
        console.log("already a road here");
        return false;
      }
    }
  }
  return true; 
};

SettlersVertexTile.prototype.addSettlement = function(settlement) {
  this.settlement = settlement;
};

module.exports = SettlersVertexTile;