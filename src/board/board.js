// more of a placeholder for now -
// should talk when merged to properly integrate this with
// existing "board" and "players" implementations if any exist
function Board() {
  this.spaces = [];
}

Board.prototype.getSpace = function(idx) { 
  return this.spaces[idx];
};

module.exports = Board;