var inherits = require('util').inherits;
var Game = require("../game.js");
var c = require("../ttConstants.js");

function CheckersGame(players, board, turnMap) {
  Game.call(this, players, board, turnMap);
  this.message = "";
  this.moveType = c.moveTypeManual;
  this.moveEvaluationType = c.moveEvalationTypeGameEvaluator;
};

inherits(CheckersGame, Game);

// assumes valid move
CheckersGame.prototype.evaluateMove = function(token, newPos) {  
  token.setPosition(newPos);
  var jumpedToken = this.getJumpedToken(token, this.token.oldPosition, this.token.newPosition);
  jumpedToken.destroy();
};

CheckersGame.prototype.isValidMove = function(token, oldPos, newPos) { 
 
  var tile = this.board[newPos.x][newPos.y];
  var player = this.game.getCurrentPlayer();
  
  if (token.owner != player) return false;
  if (tile.color == c.redColor) return false;
  if (tile.occupier) return false;

  return this.validNormalMove(token.color, oldPos, newPos, 1) || 
    this.validJumpMove(token.color, oldPos, newPos);  
};

CheckersGame.prototype.validNormalMove = function(token, oldPos, newPos, moveLen) { 
  
  var yModifier = token.color == c.redColor ? moveLen : -moveLen;
  return oldPos.y + yModifier == newPos.y && Math.abs(oldPos.x - newPos.x) == moveLen;

};

CheckersGame.prototype.validJumpMove = function(token, oldPos, newPos) { 
  
  if (!this.validNormalMove(token, oldPos, newPos, 2)) return false;
  
  var jumpedToken = this.getJumpedToken(token, oldPos, newPos);
  return jumpedToken && jumpedToken.color != token.color;

};

CheckersGame.prototype.getJumpedToken = function(token, oldPos, newPos) { 

  var yModifier = token.color == c.redColor ? 1 : -1;
  
  if (newPos.x > oldPos.x)
    return this.board.getSpace(oldPos.x + 1, oldPos.y + yModifier).occupier;
  else  
    return this.board.getSpace(oldPos.x - 1, oldPos.y + yModifier).occupier;

};

CheckersGame.prototype.playerDidWin = function() { 
  var otherPlayer = this.otherPlayer();
  var tokens = otherPlayer.tokens;
  for (var tokenIdx in tokens) { 
    if (tokens[tokenIdx]) return false;
  } 
  
  return true;
};

CheckersGame.prototype.otherPlayer = function() { 
  var player = this.getCurrentPlayer();
  return (this.players[0] == player) ? this.players[1] : this.players[0];
};

module.exports = CheckersGame;
