var Component = require("./component.js");
var inherits = require('util').inherits;
var Token = require("./token.js");
var _ = require('lodash');
var c = require("./ttConstants");

/**
 * A Player class
 * @constructor
 * @extends {Component}
 * @param {string} name - The player's name.
 * @param {hex} color - A hex color for the player's tokens.
 * @param {int} id - Player ID from server (can ignore for local games)
*/
function Player(name, color, id) {
  Component.call(this);
  this.name = name;
  this.tokens = [];
  this.color = color;
  this.id = id;
  if (this.name == "") {
    this.name = "Player";
  }
  // console.log("creating player", name);
};

inherits(Player, Component);

/**
 * Add items to a player
 * This is used by the trade (but could be used elsewhere as well)
 * @abstract
 * @param {Dictionary} items - a dictionary of items to be added to the player
*/
Player.prototype.addItems = function(items) {
  throw new Error('must be implemented by subclass!');
};

Player.prototype.destroyToken = function(token) {
  _.remove(this.tokens, function(t) {
    return t == token;
  });

  token.isDead = true;
};

Player.prototype.isAI = function() { 
  return this.name == "AI";
  // return false;
};

Player.prototype.getJSONString = function() {

  var tokenArray = [];
  for (var i = 0; i < this.tokens.length; i++) {
    var tokenText = this.tokens[i].getJSONString();
    tokenArray.push(tokenText);
  }
  var type = "Human";
  //if(this instanceof TableTop.AIPlayer){
  if(this.isAI()){
    type = "AI"
  }
  // console.log("type", type);

  return {
    name: this.name,
    color: this.color,
    id: this.id,
    tokens: tokenArray,
    type: type
  };
};

Player.prototype.createFromJSONString = function(data) {
  this.name = data.name;
  this.color = data.color;
  this.id = data.id;
  this.tokens = [];

  for (var i = 0; i < data.tokens.length; i++) {
    var token = TokenFactory(data.tokens[i].type);
    token.createFromJSONString(data.tokens[i]);
    this.tokens.push(token);
  }
};

Player.prototype.generateMove = function(game) { 

  var moves = game.getValidMoves();
  var results = [];
  // console.log("got all valid moves", moves);
  moves.forEach(function(move) { 
    
    var gameCopy = game.copyGameStatus(game);    
    gameCopy.proposedMove = game.copyMoveForGame(move, gameCopy); 
    gameCopy.executeMove();
    results.push({
      move: move, 
      score: gameCopy.scoreBoard()
    });
  });

  // console.log("results", results)
  var result = this.pickMove(results);
  // console.log("result", result)
  return result.move;
};

Player.prototype.pickMove = function(results) { 
  
  // sort descending based on score
  var resultsSorted = results.sort(function(a, b) { 
    return b.score - a.score; 
  });
  
  // console.log("resultsSorted", resultsSorted);
// console.log("this.difficulty", this.difficulty);

  var range = 1; 
  if (this.difficulty == c.AIDifficultyHard) { 
    range = 1; 
  } else if (this.difficulty == c.AIDifficultyMedium) { 
    range = Math.min(results.length, 3);
  } else if (this.difficulty == c.AIDifficultyEasy) { 
    range = Math.min(results.length, 5);
  }

  return resultsSorted[Math.floor(Math.random()*range)];
};

module.exports = Player;
