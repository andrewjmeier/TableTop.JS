# Demo - SimpleGame

The SimpleGame Demo is designed to get you familiar with the framework and the different classes that we have to offer. The "game" that you'll create is not fun at all, but it's a very easy way for you to see all the different parts of the framework and how they work. 

We're assuming that you have already setup your project and have the TableTopSkeleton setup. 

### board_game.js -- Your Main File

Take a look at the board_game.js file located in the src directory. This file is the entry point to your board game and it is where webpack will look in order to compile your JavaScript. You can change the name of this file to match the name of the game you're creating, but then you **must change that in the webpack.config file as well.**

All of the code that you need for this demo is already in board_game.js, but we'll explain it in a little more detail here. 

```
var TableTop = require('tabletop-boardgames');
``` 

At the top of almost every class that you'll make, you will want to require (or import) the TableTop framework. Doing this creates a variable, `TableTop` representing the framework.

Next, we'll require a few more files. These are classes that we wrote that subclass different classes in the framework. 

```
var SimpleGame = require("./simple_game.js");
var SimpleBoard = require("./simple_board.js");
var SimpleView = require("./simple_view.js");
```

Here instead of putting just the name of the file we have to include the path to the file. `./` indicates that the files are in the same directory as board_games.js

To create our players, we'll use the basic Player class from the TableTop framework. There isn't any extra functionality that we need to add, so we do not need to make a subclass for it. 

```
var playerOne = new TableTop.Player("Alice", 1);
var playerTwo = new TableTop.Player("Bob", 2);
var players = [playerOne, playerTwo];
```

After that, we'll create the board, game, and the state machine. 

```
var board = new SimpleBoard();
var game = new SimpleGame(players, board);
var turnMap = new TableTop.ManualTurn(game);
game.setTurnMap(turnMap);
```

We're using the ManualTurn state machine which works well for games where the player moves a token from one place to another and then his turn is over. For games with more complicated move types you can create your own state machine (more on that later).

Now, we just need to setup the view and draw the board

```
var view = new SimpleView(game, turnMap);
view.drawBoard();
```

And then update the state machine to start the game.

```
game.updateState("start");
```

That's all for the main file. Now we'll take a look at the SimpleBoard class.

### simple_board.js -- The Game Board

The board for our game will be a grid (similar to a checker board), except it will have two rows of ten columns. To make this, we'll subclass the TableTop GridBoard.

```
function SimpleBoard() { 
  TableTop.GridBoard.call(this, 10, 2);
  this.buildTiles();
  this.buildTokens();
}

inherits(SimpleBoard, TableTop.GridBoard);
```

In the constructor we need to call the GridBoard constructor and pass in the parameters for the width and height of the GridBoard. Then we'll call two methods we'll write, `buildTiles` and `buildTokens` to create the tiles on the GridBoard.

`buildTiles` is going to create a new Tile object for each cell in the board. Here we have a pretty simple set of nested for loops to acheive the task.

```
SimpleBoard.prototype.buildTiles = function() {
  var tileColor = 0x324F17;  // a dark green color
  var tile;
  for (var x = 0; x < this.width; x++) {
    for (var y = 0; y < this.height; y++) {
      tile = new TableTop.Tile({color: tileColor});
      this.tiles[x][y] = tile;
    }
  } 
};
```

Now we want to create a token for each player and place it in the first tile of each row.

```
SimpleBoard.prototype.buildTokens = function() { 

  var player1Start = this.getTile(0, 0);
  this.buildTokenForTile(player1Start, 0x000000);

  var player2Start = this.getTile(0, 1);
  this.buildTokenForTile(player2Start, 0xFFFFFF);

};
```

We have a helpful method `buildTokenForTile` that makes a new token and adds it to the given Tile on the board.

```
SimpleBoard.prototype.buildTokenForTile = function(tile, color) { 
  var token = new TableTop.Token(null, tile, color);
  tile.addOccupier(token);
  this.tokens.push(token);
};
```

That's it for the board. Now we need to subclass the view so we know how to draw a tile and a token.

### simple_view.js -- The Game View

Just like in the board, our SimpleView is going to inherit from TableTop.View.

```
function SimpleView(game, turnMap) { 
  TableTop.View.call(this, game, turnMap);
} 

inherits(SimpleView, TableTop.View);
```

We don't have any extra instance variables to set up or parameters to pass, but we do have a few methods that we want to write. 

Our board has Tiles and Tokens and we need to explain how we want them to be drawn.

```
SimpleView.prototype.drawTile = function(tile, size) { 
  
  var tileView = new PIXI.Graphics();
  tileView.lineStyle(1, 0, 1);
  tileView.beginFill(tile.color, 1);
  tileView.drawRect(0, 0, size.width, size.height);
  return tileView;
  
};
```

We'll draw a Tile as a simple square with its color specified by the tile object passed in as a parameter. 

For the Token, we'll draw a circle instead. 

```
SimpleView.prototype.drawToken = function(token, size) { 

  var tokenView = new PIXI.Graphics();
  tokenView.lineStyle(1, 0, 1);
  tokenView.beginFill(token.color, 1);
  tokenView.drawCircle(size.width/2, size.height/2, size.width/2 - 20);
  return tokenView;

};
```

### simple_game.js -- The Game State

Finally, we need to set up the actual game logic. Here we'll provide code to say what a valid move is and when the game is over. 

We will start with the constructor again. This time, we need to set up some instance variables to explain what type of game we are making. 

```
function SimpleGame(players, board, turnMap) {
  TableTop.Game.call(this, players, board, turnMap);
  this.currentPlayer = 0;
  this.moveType = TableTop.Constants.moveTypeManual;
  this.moveEvaluationType = TableTop.Constants.moveEvalationTypeGameEvaluator;
  board.tokens.forEach(function(token) { 
    var player = token.color == 0x000000 ? players[0] : players[1];
    token.owner = player;
    player.tokens.push(token);
  });
};

inherits(SimpleGame, TableTop.Game);
```

`moveTypeManual` is the type for our game. This matches up with the ManualTurn state machine that we're using as well. We are also using a GameEvaluator as the `moveEvaluationType` so that the TableTop framework knows how to check to see if a move is valid.

After the player makes a move, we need to know how to change the state of the game to represent that a move has been made. In our game, a move will consist of the player clicking on a token and then clicking on a tile to move it to. We need to remove the token from the old tile and associate it with the new tile instead.

```
SimpleGame.prototype.executeMove = function() {  

  // store proposedMove data for convenience
  var token = this.proposedMove.token;
  var destination = this.proposedMove.destination;
  
  // get positions of current token tile and the destination
  var oldPosition = this.board.getTilePosition(token.tile);
  var newPosition = this.board.getTilePosition(destination);
  
  // move the token to the new tile and clear proposedMove
  token.moveToTile(destination);
  this.proposedMove = {};
};
```

But not all moves are allowed. We don't want the player to be able to move his opponents token and it's also against our game's rules to move your token backward. We'll provide that logic with the `isValidMove` method.

```
SimpleGame.prototype.isValidMove = function(token, oldTile, newTile) { 
  
  var oldPos = this.board.getTilePosition(oldTile);
  var newPos = this.board.getTilePosition(newTile);
  
  var player = this.getCurrentPlayer();
  
    /* 
       If we don't own the piece or
       the destination is a red tile or 
       the destination is occupied 
       it's not a valid move! 
     */
  if (token.owner != player) {
    return false;
  }

  return newPos.x > oldPos.x;
};
```

The final step is determining if it's Game Over! 

```
SimpleGame.prototype.playerDidWin = function(player) {
  var token = player.tokens[0];
  return this.board.getTilePosition(token.tile).x === 9;
};
```

If the player's token reaches all the way to the end of the board, he's the winner. So we'll just check the x position of the token's tile to see if it equals nine (since we have ten tiles on the board starting at index 0).

That's it! The game should be complete. Make sure that you have webpack running in the Terminal using the command `npm run webpack` and then open the index.html file to try out your new game! 