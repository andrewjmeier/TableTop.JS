var inherits = require('util').inherits;
var TableTop = require("../../tabletop/tabletop.js");
var CheckerBoard = require('./checkers_board');

function CheckersGame(board) {
  TableTop.Game.call(this, board);
  this.currentPlayer = 0;
  this.moveType = TableTop.Constants.moveTypeManual;
  this.moveEvaluationType = TableTop.Constants.moveEvalationTypeGameEvaluator;
  this.possibleNumPlayers = [2];
  this.showNextPlayerScreen = false;
};
inherits(CheckersGame, TableTop.Game);

CheckersGame.prototype.setPlayers = function(players) {  
  this.players = players;

  this.board.tokens.forEach(function(token) { 
    var player = token.color == TableTop.Constants.redColor ? players[0] : players[1];
    token.owner = player;
    player.tokens.push(token);
  });
};


CheckersGame.prototype.executeMove = function() {  

  // store proposedMove data for convenience
  var token = this.proposedMove.token;
  var destination = this.proposedMove.destination;

  // get positions of current token tile and the destination
  var oldPosition = this.board.getTilePosition(token.tile);
  var newPosition = this.board.getTilePosition(destination);

  // check if we jumped a token, and remove it if so 
  var jumpedToken = this.getJumpedToken(token, oldPosition, newPosition);

  if (jumpedToken)
    jumpedToken.destroy();

  // move the token to the new tile and clear proposedMove
  token.moveToTile(destination);
  this.proposedMove = {};
};


CheckersGame.prototype.getJumpedToken = function(token, oldPos, newPos) { 

  // are we moving up or down? 
  var yModifier = token.color == TableTop.Constants.redColor ? 1 : -1;

  // grab the occupier of the tile that we jumped
  // if we didn't jump anything, this will return null - that's what we want!
  if (newPos.x > oldPos.x)
    return this.board.getTile(oldPos.x + 1, oldPos.y + yModifier).occupier;
  else  
    return this.board.getTile(oldPos.x - 1, oldPos.y + yModifier).occupier;

};

CheckersGame.prototype.isValidMove = function(token, oldTile, newTile) { 

  var oldPos = this.board.getTilePosition(oldTile);
  var newPos = this.board.getTilePosition(newTile);

  var player = this.getCurrentPlayer();

  /* 
   If we don't own the piece or
   the destination is a red tile or 
   the destination is occupied 
   it's not a valid move! 
   */
  if (token.owner != player || 
      newTile.color == TableTop.Constants.redColor || 
      newTile.occupier) 
    return false;

  return this.validNormalMove(token, oldPos, newPos, 1) || 
    this.validJumpMove(token, oldPos, newPos);  
};

CheckersGame.prototype.validNormalMove = function(token, oldPos, newPos, moveLen) { 

  // are we moving up or down? 
  var yModifier = token.color == TableTop.Constants.redColor ? moveLen : -moveLen;
  return oldPos.y + yModifier == newPos.y && Math.abs(oldPos.x - newPos.x) == moveLen;

};

CheckersGame.prototype.validJumpMove = function(token, oldPos, newPos) { 

  // make sure it's a valid normal move that's two spaces long
  if (!this.validNormalMove(token, oldPos, newPos, 2)) return false;

  // make sure we jump an enemy token 
  var jumpedToken = this.getJumpedToken(token, oldPos, newPos);
  return jumpedToken && jumpedToken.color != token.color;

};

CheckersGame.prototype.playerDidWin = function(player) { 
  var otherPlayer = (this.players[0] == player) ? this.players[1] : this.players[0];
  var tokens = otherPlayer.tokens;
  for (var tokenIdx in tokens) { 
    if (tokens[tokenIdx]) return false;
  } 
  
  return true;
};


module.exports = CheckersGame;
