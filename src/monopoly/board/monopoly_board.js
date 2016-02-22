var TableTop = require('../../../tabletop/tabletop');
var _ = require('lodash');
var inherits = require('util').inherits;

// more of a placeholder for now -
// should talk when merged to properly integrate this with
// existing "board" and "players" implementations if any exist
function MonopolyBoard() {
    TableTop.Board.call(this);
    this.tiles = [];
}

inherits(MonopolyBoard, TableTop.Board);

MonopolyBoard.prototype.findTileForToken = function(token) {
    var tile = _.find(this.tiles, function (n) {
        var found = _.find(n.tokens, function(other) {
          return other.id === token.id;
        });
        if (undefined != found) {
          return true; 
        }
    });

    if (undefined == tile) {
      console.log(tile, "UNDEFINED!!");
    }

    return tile;
};

MonopolyBoard.prototype.moveTokenToTile = function(token, tile) {
    var oldTile = this.findTileForToken(token);
    if (undefined != oldTile) {
        oldTile.tokens.splice(this.tiles.indexOf(token), 1);
    }
    tile.addToken(token);
};

MonopolyBoard.prototype.destroyToken = function(token) {
  var tile = this.findTileForToken(token);
  tile.removeToken(token);

  var idx = this.tokens.indexOf(token);

  if (idx > -1) {
    this.tokens.splice(idx, 1);
  }
};

MonopolyBoard.prototype.getJSONString = function() {
  var tiles = [];

  for (var i = 0; i < this.tiles.length; i++){
      var tileText = this.tiles[i].getJSONString();
      tiles.push(tileText);
  }
  return tiles;
};

MonopolyBoard.prototype.createFromJSONString = function(data) {
  for (var i = 0; i < this.tiles.length; i++) {
    var tile = this.tiles[i];
    tile.createFromJSONString(data[i]);
  }
};

module.exports = MonopolyBoard;