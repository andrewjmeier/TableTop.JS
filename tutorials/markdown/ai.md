# Using AI

## How to use AI Player 

Simply give one or more of the players the name "ai" (case insensitive) 

## How to implement AI in your game 

### Optional 

Set the difficulty using this.AIDifficulty. Defaults to AIDifficultyEasy.

### Required
    
You need to override two methods. 

First, override ```getValidMoves()```.     This function should return all the possible moves in the same format used for game.proposedMove. For moveTypeManual games, such as Checkers, the proposed move takes the format 
```
{   
        token: token, 
        tile: tile, 
        destination: destination
}
```

Here's our implemetation for Checkers: 

```
CheckersGame.prototype.getValidMoves = function() { 

  var validMoves = [];
  
  this.board.tokens.forEach(function(token) {     
    
    var tile = this.board.findTileForToken(token);
    
    // for each possible destination tile...
    this.board.tiles.forEach(function(destinationRow) { 
      destinationRow.forEach(function(destination) { 
        
        if (this.isValidMove(token, tile, destination)) 
          validMoves.push({
            token: token, 
            tile: tile, 
            destination: destination
          });
        

      }, this);
    }, this);    
  }, this);

  
  return validMoves;
};
```

Second, you need to override scoreBoard. This can be as simple or as advanced as you'd like. For a game like Checkers, you could value the board based on how many tokens are remaining (shown below). If you wanted more advanced AI, you could play higher value on defending pieces. 

```
CheckersGame.prototype.scoreBoard = function(player) { 
  var otherPlayer = this.players[this.getNextPlayer()];
  return 12 - otherPlayer.tokens.length;
};
```


### Advanced 

For the AI to properly work, it needs to be able to understand the objects in your proposedMove object in order to properly convert into objects that the game copies can understand. By default, the AI system copies all tokens and tiles over using their appropriate keys. If your proposed move contains objects that aren't tiles or tokens, then you'll need to override ```game.copyMoveForGame(move, gameCopy)```

