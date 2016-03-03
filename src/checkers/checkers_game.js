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
  this.hasMadeGame = false;
  this.firstMove = true;
};
inherits(CheckersGame, TableTop.Game);

CheckersGame.prototype.createPlayer = function(name) {
  var player = new TableTop.Player(name, 0, 0); // TODO: remove this number field?
  this.propagate(player);
  return player;
};

CheckersGame.prototype.updateToStartState = function() {
  this.updateState("start");
};

CheckersGame.prototype.gameCreated = function(msg) {
  CheckersGame.super_.prototype.gameCreated.call(this, msg);

  var context = this;
  if(this.players.length == 2){
    this.board.tokens.forEach(function(token) { 
      if(token.cssClass == "white"){
        context.players[0].tokens.push(token);
      } else {
        context.players[1].tokens.push(token);
      }
    });
  }
  this.sendMessage("refreshView", "view");
};


CheckersGame.prototype.getJSONString = function() {

  var playersArray = [];
  for (var i = 0; i < this.players.length; i++) {
    var playerText = this.players[i].getJSONString();
    playersArray.push(playerText);
  }


  return {
    players: playersArray,
    currentPlayer: this.currentPlayer,
    board: this.board.getJSONString(),
    gameID: this.gameID
  }

};

CheckersGame.prototype.createFromJSONString = function(data) {
  var dic = JSON.parse(data);

  // only update if it's this game
  if (this.gameID !== dic.gameID) {
    return;
  }

  this.currentPlayer = dic.currentPlayer;
  
  for (var i = 0; i < dic.players.length; i++) {
    var player = new TableTop.Player();
    this.propagate(player);
    player.createFromJSONString(dic.players[i]);
    this.players[i] = player;
  }
  this.board.createFromJSONString(dic.board);

  this.sendMessage("refreshView", "view");

};

CheckersGame.prototype.executeMove = function() {  

  // store proposedMove data for convenience
  var token = this.proposedMove.token;
  var destination = this.proposedMove.destination;

  // get positions of current token tile and the destination
  var tile = this.board.findTileForToken(token);
  var oldPosition = this.board.getTilePosition(tile);
  var newPosition = this.board.getTilePosition(destination);

  // check if we jumped a token, and remove it if so 
  var jumpedToken = this.getJumpedToken(token, oldPosition, newPosition);


  if (jumpedToken) {
    this.destroyToken(jumpedToken);
  }

  // move the token to the new tile and clear proposedMove
  this.board.moveTokenToTile(token, destination);
  this.proposedMove = {};

  this.sendMessage("refreshView", "view");
};

CheckersGame.prototype.getJumpedToken = function(token, oldPos, newPos) { 

  // are we moving up or down? 
  var yModifier = token.color == "black" ? 1 : -1;

  // grab the occupier of the tile that we jumped
  // if we didn't jump anything, this will return null - that's what we want!
  if (newPos.x < oldPos.x)
    return this.board.getTile(oldPos.x - 1, oldPos.y + yModifier).tokens[0];
  else  
    return this.board.getTile(oldPos.x + 1, oldPos.y + yModifier).tokens[0];

};

//one is game doesn't seem to work for me. Not sure why
CheckersGame.prototype.getPlayerForToken = function(token) {
  for (var i = 0; i < this.players.length; i++) {
    for (var j = 0; j < this.players[i].tokens.length; j++) {
      if(this.players[i].tokens[j].id == token.id){
        return this.players[i];
      }
    }
  }
  return null;
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

  var p = this.getPlayerForToken(token);

  if (this.getPlayerForToken(token) != player || 
      newTile.color != TableTop.Constants.redColor || 
      newTile.tokens[0]) {

    return false;
  }

  return this.validNormalMove(token, oldPos, newPos, 1) || 
    this.validJumpMove(token, oldPos, newPos);
};

CheckersGame.prototype.validNormalMove = function(token, oldPos, newPos, moveLen) { 


  // are we moving up or down? 
  var yModifier = token.color == "black" ? moveLen : -moveLen;
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
