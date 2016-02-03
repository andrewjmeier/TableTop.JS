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
        return (n.tokens.indexOf(token) != -1);
    });

    return tile;
};

MonopolyBoard.prototype.moveTokenToTile = function(token, tile) {
    var oldTile = this.findTileForToken(token);
    console.log(oldTile);
    if (oldTile != undefined) {
        oldTile.tokens.splice(this.tiles.indexOf(oldTile), 1);
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

module.exports = MonopolyBoard;