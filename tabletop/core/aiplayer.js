var inherits = require('util').inherits;
var Player = require("./Player.js");
var Gridboard = require("./Gridboard.js");
var c = require("./ttConstants");

/**
 * AI Player
 * @constructor
 * @extends {Player}
 * @param {string} difficulty - difficulty of AI 
*/

function AIPlayer(difficulty) {
  Player.call(this);
  this.difficulty = difficulty;
}

inherits(AIPlayer, Player);


AIPlayer.prototype.isAI = function() { 
  return true;
};


AIPlayer.prototype.pickMove = function(game) { 

  var moves = this.getValidMoves();
  var results = [];

  // for each token, grab the appropriate objects from the game copy object
  // (since getValidMoves will return actual game objects and we want 
  // the copies). Then execute the move and score it.
  for (var i = 0; i < moves.tokens.length; i++) {

    var tokenIdx = this.board.tokens.indexOf(moves.tokens[i]);
    var tilePos = game.board.getTilePosition(moves.tiles[i]);
    
    moves.destinationTiles[i].forEach(function(dest) { 
      var destPos = game.board.getTilePosition(dest);

      var gameCopy = game.copyGameStatus(game);

      var tokenCp = gameCopy.board.tokens[tokenIdx];
      var tileCp, destCp;
      if (game.board instanceof Gridboard) { 
        tileCp = gameCopy.board.tiles[tilePos.x][tilePos.y];
        destCp = gameCopy.board.tiles[destPos.x][destPos.y];
      } else { 
        tileCp = gameCopy.board.tiles[tilePos];
        destCp = gameCopy.board.tiles[destPos];
      } 
        
      gameCopy.proposedMove = {
        token: tokenCp,
        tile: tileCp,
        destination: destCp,
        tokenIdx: tokenIdx, 
        tilePos: tilePos, 
        destPos: destPos
      };
      
      gameCopy.executeMove();
      results.push({
        score: gameCopy.scoreBoard(game), 
        token: tokenCp, 
        tile: tileCp, 
        destination: destCp,
        tokenIdx: tokenIdx, 
        tilePos: tilePos, 
        destPos: destPos
      });
    });
  }
  
  var bestResult = results[0];
  var bestScore = 0;

  
  results.forEach(function(result) { 
    if (result.score > bestScore) { 
      bestResult = result; 
      bestScore = result.score;
    }
  });

  
  var actualToken = game.board.tokens[bestResult.tokenIdx];
  // actualTile should be same as game.board.tile[tilePos], but we 
  // use this cause it generalizes to all board types 
  var actualTile = game.board.findTileForToken(actualToken);

  var actualDest;
  if (game.board instanceof Gridboard) { 
    actualDest = game.board.getTile(bestResult.destPos.x, bestResult.destPos.y);
  } else { 
    actualDest = game.board.getTile(bestResult.destPos);
  } 
  
  var actualBestMove = 
        { 
          token: actualToken,
          tile: actualTile,
          destination: actualDest
        };
  
  return actualBestMove;
};

AIPlayer.prototype.getValidMoves = function(game) { 

  var legalMoves = {};
  legalMoves.tokens = [];
  legalMoves.tiles = [];
  legalMoves.destinationTiles = [];
  if (game.moveType == c.moveTypeManual) { 
    
    game.tokens.forEach(function(token) { 
      var tile = game.board.findTileForToken(token);
      var destinationTiles = [];
      // since this.board is a double array we need to double loop
      game.board.tiles.forEach(function(destinationRow) { 
        destinationRow.forEach(function(destination) { 
          if (game.isValidMove(token, tile, destination))
            destinationTiles.push(destination);
        }, this);
      });
      
      if (destinationTiles.length > 0) { 
        legalMoves.tokens.push(token);
        legalMoves.tiles.push(tile);
        legalMoves.destinationTiles.push(destinationTiles);
      }
    });
    
  } 
  
  return legalMoves;
};


module.exports = AIPlayer;
