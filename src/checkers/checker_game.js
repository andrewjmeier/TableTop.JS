var inherits = require('util').inherits;
// var Game = require("../../tabletop/core/game.js");
var c = require("../../tabletop/core/ttConstants.js");
var TableTop = require('../../tabletop/tabletop');

function CheckersGame(players, board, turnMap) {
  TableTop.Game.call(this, players, board, turnMap);
  this.currentPlayer = 0;
  this.moveType = c.moveTypeManual;
  this.moveEvaluationType = c.moveEvalationTypeGameEvaluator;
  board.tokens.forEach(function(token) { 
    var player = token.color == c.redColor ? players[0] : players[1];
    token.owner = player;
    player.tokens.push(token);
  });
};

inherits(CheckersGame, TableTop.Game);

CheckersGame.prototype.executeMove = function() {  

  // store proposedMove data for convenience
  var token = this.proposedMove.token;
  var destination = this.proposedMove.destination;
  
  // get positions of current token space and the destination
  var oldPosition = this.board.getSpacePosition(token.space);
  var newPosition = this.board.getSpacePosition(destination);
  
  // check if we jumped a token, and remove it if so 
  var jumpedToken = this.getJumpedToken(token, oldPosition, newPosition);

  if (jumpedToken)
    jumpedToken.destroy();
  
  // move the token to the new space and clear proposedMove
  this.moveTokenToSpace(token, destination);
  this.proposedMove = {};
};

CheckersGame.prototype.isValidMove = function(token, oldSpace, newSpace) { 
  
  var oldPos = this.board.getSpacePosition(oldSpace);
  var newPos = this.board.getSpacePosition(newSpace);
  
  var player = this.getCurrentPlayer();
  
    /* 
       If we don't own the piece or
       the destination is a red space or 
       the destination is occupied 
       it's not a valid move! 
     */
  if (token.owner != player || 
     newSpace.color == c.redColor || 
     newSpace.occupier) 
    return false;

  return this.validNormalMove(token, oldPos, newPos, 1) || 
    this.validJumpMove(token, oldPos, newPos);  
};

CheckersGame.prototype.validNormalMove = function(token, oldPos, newPos, moveLen) { 

  // are we moving up or down? 
  var yModifier = token.color == c.redColor ? moveLen : -moveLen;
  return oldPos.y + yModifier == newPos.y && Math.abs(oldPos.x - newPos.x) == moveLen;

};

CheckersGame.prototype.validJumpMove = function(token, oldPos, newPos) { 
  
  // make sure it's a valid normal move that's two spaces long
  if (!this.validNormalMove(token, oldPos, newPos, 2)) return false;
  
  // make sure we jump an enemy token 
  var jumpedToken = this.getJumpedToken(token, oldPos, newPos);
  return jumpedToken && jumpedToken.color != token.color;

};

CheckersGame.prototype.getJumpedToken = function(token, oldPos, newPos) { 

  // are we moving up or down? 
  var yModifier = token.color == c.redColor ? 1 : -1;
  
  // grab the occupier of the space that we jumped
  // if we didn't jump anything, this will return null - that's what we want!
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
