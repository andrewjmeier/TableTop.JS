var inherits = require('util').inherits;
var Player = require("./Player.js");
var Gridboard = require("./grid_board.js");
var c = require("./ttConstants");

/**
 * AI Player
 * @constructor
 * @extends {Player}
 * @param {string} difficulty - difficulty of AI. Should be one of the values of TableTop.Constants.validAIDifficulties.
*/

function AIPlayer(name, color, difficulty) {
  Player.call(this, name, color);
  
  // safety check
  if (c.validAIDifficulties.indexOf(difficulty) == -1)
    difficulty = c.AIDifficultyEasy;
  
  this.difficulty = difficulty;
}

inherits(AIPlayer, Player);


AIPlayer.prototype.isAI = function() { 
  return true;
};


AIPlayer.prototype.generateMove = function(game) { 

  var moves = game.getValidMoves();
  var results = [];
  
  moves.forEach(function(move) { 
    
    var gameCopy = game.copyGameStatus(game);    
    gameCopy.proposedMove = game.copyMoveForGame(move, gameCopy); 
    gameCopy.executeMove();
    results.push({
      move: move, 
      score: gameCopy.scoreBoard(game)
    });
  });

  var result = this.pickMove(results);
  return result.move;
};

AIPlayer.prototype.pickMove = function(results) { 
  
  // sort descending based on score
  var resultsSorted = results.sort(function(a, b) { 
    return b.score - a.score; 
  });
  
  var range; 
  if (this.difficulty == c.AIDifficultyHard) { 
    range = 1; 
  } else if (this.difficulty == c.AIDifficultyMedium) { 
    range = Math.min(results.length, 3);
  } else if (this.difficulty == c.AIDifficultyHard) { 
    range = Math.min(results.length, 5);
  } 

  return resultsSorted[Math.floor(Math.random()*range)];
};

module.exports = AIPlayer;
