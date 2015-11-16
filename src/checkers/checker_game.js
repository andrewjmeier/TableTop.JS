var inherits = require('util').inherits;
var Game = require("../game.js");
var c = require("../ttConstants.js");

function CheckersGame(players, board, turnMap) {
  Game.call(this, players, board, turnMap);
  this.moveType = c.moveTypeManual;
  this.moveEvaluationType = c.moveEvalationTypeGameEvaluator;
  board.tokens.forEach(function(token) { 
    var player = token.color == c.redColor ? players[0] : players[1];
    token.owner = player;
    player.tokens.push(token);
  });
};

inherits(CheckersGame, Game);

CheckersGame.prototype.evaluateMove = function() {  

  var token = this.proposedMove.token;
  var destination = this.proposedMove.destination;
  
  var oldPosition = this.board.getSpacePosition(token.space);
  var newPosition = this.board.getSpacePosition(destination);
  
  var jumpedToken = this.getJumpedToken(token, oldPosition, newPosition);

  if (jumpedToken)
    jumpedToken.destroy();
  
  this.moveTokenToSpace(token, destination);
  this.proposedMove = {};
};

CheckersGame.prototype.isValidMove = function(token, oldSpace, newSpace) { 
  
  var oldPos = this.board.getSpacePosition(oldSpace);
  var newPos = this.board.getSpacePosition(newSpace);
  
  var player = this.getCurrentPlayer();
  
  if (token.owner != player || 
     newSpace.color == c.redColor || 
     newSpace.occupier) 
    return false;

  return this.validNormalMove(token, oldPos, newPos, 1) || 
    this.validJumpMove(token, oldPos, newPos);  
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

CheckersGame.prototype.playerDidWin = function(player) { 
  var otherPlayer = (this.players[0] == player) ? this.players[1] : this.players[0];
  var tokens = otherPlayer.tokens;
  for (var tokenIdx in tokens) { 
    if (tokens[tokenIdx]) return false;
  } 
  
  return true;
};

module.exports = CheckersGame;
