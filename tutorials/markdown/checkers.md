# Demo - Checkers

In this demo, we'll be creating a simple checkers game. By the end of the tutorial you should be able to play a game of checkers with another player over a local server. For simplicity sake, we'll exclude some of the more complicated rules - most notably, we won't be upgrading tokens when they hit the last row, and we won't be allowing double jumps. Hopefully by the end of this tutorial you'll be able to add those features by yourself!

When you create a game, there are 5 major components: the Players, Game, Board, TurnMap, and View. As we'll learn shortly, these classes, with very little configuration, can be extremely powerful and do a lot of the heavy lifting for you.

### Checkers.js -- Your Main File

To begin, create a new file checkers.js in the root of your project folder. This will be the file that the framework looks for to builds your game. Some parts of this may be confusing to you; don't worry about that right now, we'll be explaining everything shortly. 
```
    // Checkers.js
    // Start creating your game here

    var TableTop = require('../tabletop/tabletop.js');
    var Checkers = require('./checkers/checkers_game');
    var CheckerBoard = require('./checkers/checkers_board');
    var CheckerView = require('./checkers/checkers_view');

    // create the Board, Game
    var board = new CheckerBoard();
    var checkers = new Checkers(board);

    //create our view
    var view = new TableTop.GridView(checkers);

    //create the turnmap
    var turnMap = new TableTop.ManualTurn(checkers);

    checkers.setTurnMap(turnMap);

    checkers.updateToStartState();
```

This is all you need so far for the main game file. In general, your (game).js file should never be much longer than this -- you should offload the complicated logic to your subclasses of the game components (like we will do with Checkers, CheckerBoard and CheckersView).

Before continuing, let's go over what we're doing above. First, we create our Board and Game. Then we made the grid view and eventually turnmap. We then set the turnMap of our game to the turnMap just created. The turnmap acts as the controller allowing the flow of the game. It also begins to run our game when we update the state.

### The Game

At this point, you'll be getting an error that checkers/checkers_game.js and checkers/checkers_board.js don't exist - let's fix that and create those now. 

In checkers_game.js, enter the following: 
```
    // checkers_game.js
    var inherits = require('util').inherits;
    var TableTop = require("../../tabletop/tabletop.js");
    var CheckerBoard = require('./checkers_board');

    //constructor of the game
    function CheckersGame(board) {
      TableTop.Game.call(this, board);
      this.moveType = TableTop.Constants.moveTypeManual;
      this.currentPlayer = 0;
      this.moveEvaluationType = TableTop.Constants.moveEvalationTypeGameEvaluator;
      this.networking = false;
      this.showNextPlayerScreen;
    };
    inherits(CheckersGame, TableTop.Game);

    CheckersGame.prototype.createPlayer = function(name) {
      var player = new TableTop.Player(name, 0, 0); 
      this.propagate(player);
      return player;
    };

    CheckersGame.prototype.updateToStartState = function() {
      this.updateState("start");
    };

    module.exports = CheckersGame;
```
This is the constructor for our game. We overwrite a few important defaults here. 

First, we set the moveType to TableTop.Constants.moveTypeManual. Game defaults to using TableTop.Constants.moveTypeDiceRoll, which is useful for games like monopoly where there's only one path the follow, however we want the user to be able to control where she moves her token. This flag lets our view know that it should add click listeners to tokens and tiles in our view, and lets our game know that it should store these listener events as they arrive for later evaluation.

Second, we set the moveEvaluationType to TableTop.Constants.moveEvaluationTypeGameEvaluator. This lets our game know that it will be doing to move evaluation rather than the tiles. When we set this flag, the TurnMap will call "executeMove()" on our game class to decide what the side effects of a move are. 

### The Board

We'll finish filling out our game class later. For now, let's move on to the checkers_board class. Create the file and enter the following: 
```   
    // checkers_board.js
    var inherits = require('util').inherits;
    var TableTop = require("../../tabletop/tabletop.js");

    //constructor for CheckersBoard
    function CheckerBoard() { 
      TableTop.GridBoard.call(this, 8, 8);
      this.buildTiles();
    }       
    inherits(CheckerBoard, TableTop.GridBoard);

    //method to build tiles for the checkers board
    CheckerBoard.prototype.buildTiles = function() { 
      var tileColor = TableTop.Constants.blackColor;
      var tile;
      for (var y = 0; y < this.height; y++) {
        tileColor = (tileColor == TableTop.Constants.redColor) ? TableTop.Constants.blackColor : TableTop.Constants.redColor;
        for (var x = 0; x < this.width; x++) {
          tile = new TableTop.Tile({color: tileColor});
          this.tiles[x][y] = tile;
          tileColor = (tileColor == TableTop.Constants.redColor) ? TableTop.Constants.blackColor : TableTop.Constants.redColor;
        }
      } 
    };

module.exports = CheckerBoard;
```

First,we subclass GridBoard. PathBoard (for games like monopoly) and GraphBoard (for games like Settlers of Catan) are other options, but for Checkers we are going to need a GridBoard. Then, we build the tiles for our game. We alternate colors black and red to create the checkerboard effect. 

### The View

Now let's work on our view. We need to create an html layout of how the board should look. You can copy the default GridBoard html layout and modify it slightly so that the colours alternate between black an white. After doing this, the file checkers.html should look like this: 

```
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" type="text/css" href="./assets/css/tabletop.css">
          <link rel="stylesheet" type="text/css" href="./assets/css/grid_board.css">
          <link rel="stylesheet" type="text/css" href="./assets/css/checkers.css">
          <title> Checkers v.2 </title>
      </head>
      <body>
          <div class="game-table">
              <div class="board">
                  <div class="tile-list">
                      <div class="row container">
                          <div class="tile red" id="tile0"> 
                          </div>
                          <div class="tile black" id="tile1"> 
                          </div>
                          <div class="tile red" id="tile2"> 
                          </div>
                          <div class="tile black" id="tile3"> 
                          </div>
                          <div class="tile red" id="tile4"> 
                          </div>
                          <div class="tile black" id="tile5">  
                          </div>
                          <div class="tile red" id="tile6"> 
                          </div>
                          <div class="tile black" id="tile7"> 
                          </div>
                      </div>

                      <div class="row container">
                          <div class="tile black" id="tile8"> 
                          </div>
                          <div class="tile red" id="tile9"> 
                          </div>
                          <div class="tile black" id="tile10"> 
                          </div>
                          <div class="tile red" id="tile11"> 
                          </div>
                          <div class="tile black" id="tile12"> 
                          </div>
                          <div class="tile red" id="tile13">  
                          </div>
                          <div class="tile black" id="tile14"> 
                          </div>
                          <div class="tile red" id="tile15"> 
                          </div>
                      </div>

                     <div class="row container">
                          <div class="tile red" id="tile16"> 
                          </div>
                          <div class="tile black" id="tile17"> 
                          </div>
                          <div class="tile red" id="tile18"> 
                          </div>
                          <div class="tile black" id="tile19"> 
                          </div>
                          <div class="tile red" id="tile20"> 
                          </div>
                          <div class="tile black" id="tile21">  
                          </div>
                          <div class="tile red" id="tile22"> 
                          </div>
                          <div class="tile black" id="tile23"> 
                          </div>
                      </div>

                      <div class="row container">
                          <div class="tile black" id="tile24"> 
                          </div>
                          <div class="tile red" id="tile25"> 
                          </div>
                          <div class="tile black" id="tile26"> 
                          </div>
                          <div class="tile red" id="tile27"> 
                          </div>
                          <div class="tile black" id="tile28"> 
                          </div>
                          <div class="tile red" id="tile29">  
                          </div>
                          <div class="tile black" id="tile30"> 
                          </div>
                          <div class="tile red" id="tile31"> 
                          </div>
                      </div>

                      <div class="row container">
                          <div class="tile red" id="tile32"> 
                          </div>
                          <div class="tile black" id="tile33"> 
                          </div>
                          <div class="tile red" id="tile34"> 
                          </div>
                          <div class="tile black" id="tile35"> 
                          </div>
                          <div class="tile red" id="tile36"> 
                          </div>
                          <div class="tile black" id="tile37">  
                          </div>
                          <div class="tile red" id="tile38"> 
                          </div>
                          <div class="tile black" id="tile39"> 
                          </div>
                      </div>

                      <div class="row container">
                          <div class="tile black" id="tile40"> 
                          </div>
                          <div class="tile red" id="tile41"> 
                          </div>
                          <div class="tile black" id="tile42"> 
                          </div>
                          <div class="tile red" id="tile43"> 
                          </div>
                          <div class="tile black" id="tile44"> 
                          </div>
                          <div class="tile red" id="tile45">  
                          </div>
                          <div class="tile black" id="tile46"> 
                          </div>
                          <div class="tile red" id="tile47"> 
                          </div>
                      </div>

                      <div class="row container">
                          <div class="tile red" id="tile48"> 
                          </div>
                          <div class="tile black" id="tile49"> 
                          </div>
                          <div class="tile red" id="tile50"> 
                          </div>
                          <div class="tile black" id="tile51"> 
                          </div>
                          <div class="tile red" id="tile52"> 
                          </div>
                          <div class="tile black" id="tile53">  
                          </div>
                          <div class="tile red" id="tile54"> 
                          </div>
                          <div class="tile black" id="tile55"> 
                          </div>
                      </div>

                      <div class="row container">
                          <div class="tile black" id="tile56"> 
                          </div>
                          <div class="tile red" id="tile57"> 
                          </div>
                          <div class="tile black" id="tile58"> 
                          </div>
                          <div class="tile red" id="tile59"> 
                          </div>
                          <div class="tile black" id="tile60"> 
                          </div>
                          <div class="tile red" id="tile61">  
                          </div>
                          <div class="tile black" id="tile62"> 
                          </div>
                          <div class="tile red" id="tile63"> 
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </body>
      <footer>
          <script type="text/javascript" src="/bundle.js"></script>
      </footer>
    </html>
```
Although the html looks intimidating, it should be easy enough to figure out how it works. 

You will notice that the html reference a number of div classes from the style sheet checkers.css. This is another sheet that is very simply customised to help your tiles look however you like.
```
  .red {
      background-color: #FF0000;
  }

  .black {
      background-color: #000000;
  }

  .white {
    background-color: #FFFFFF;
  }

  .token {
    width: 75%;
    height: 75%;
    margin: 1em;
    z-index: 100;
  }
```
We have specified the style for a token as well as the colors used for the tiles. The token specification will be used later.

**At this stage, you should be able compile your code and open the checkers.html file. You should  see the red and black checkers board on a white background.**

That's all that is needed for the view at this stage. We will be back to it to add some networking elements once we arrive at that stage. 

Note: we have not told our board to build the tokens yet and therefore you will not see them

Next, let's create our "tokens". Tokens are the movable, actionable objects that belong to tiles. In a game like checkers, they're our pieces. In a game like monopoly, it's the literal token that represents your player. 

Add the following method to your checkers_board.js file, and call it from your constructer after this.BuildTiles():
```    
    // function to actually build tokens
    CheckerBoard.prototype.buildTokens = function() { 

      // define coordinates for red and white tokens
      var blackX = [0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6];
      var blackY = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
      var whiteX = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];
      var whiteY = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7];

      // build the tokens
      var tile;
      for (var i = 0; i < blackX.length; i++) { 

        tile = this.getTile(blackX[i], blackY[i]);
        this.buildTokenForTile(tile, "black");

        tile = this.getTile(whiteX[i], whiteY[i]);
        this.buildTokenForTile(tile, "white");
      }
    };

    // creates the token for given tile and color, adds it to the tile, 
    // and appends it to our list of tokens
    CheckerBoard.prototype.buildTokenForTile = function(tile, color) { 
      var token = new TableTop.Token(color);
      token.cssClass = color;
      tile.addToken(token);
      this.tokens.push(token);
    };
```

To call the buildTokens function from the constructors of the checkers_board.js file use this.buildTokens();. The constructor should now look like this:
```
    function CheckerBoard() { 
      TableTop.GridBoard.call(this, 8, 8);
      this.buildTiles();
      this.buildTokens();
    }     
```
Without networking, that's all we need for the checkers_board.js file! 

**Reload your checkers.html file and you should see the tokens draw on the board.** As you can see, the framework can powerfully do alot of the heavy lifting if you properly define your board, tokens, and tiles. you cannot move the tiles yet, but let's change that!

Let's continue with checkers_game.js and add some of the game logic. Since we're using TableTop.Constants.moveEvaluationTypeGameEvaluator, the framework expects our game to have the functions executeMove() and isValidMove(). executeMove() should perform all of the game logic necessary for a given move. Note: it doesn't need to do any graphics work: that's all handled for you!  

### Evaluating Moves

Lets write our executeMove() function. This function should assume that there's a valid move stored in this.proposedMove (in the form of proposedMove.token and proposedMove.destination). 
```
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
```
**Now, refresh your checkers.html and you should be able to move tokens around.** Notice that the game has no concept of what should be a valid move or not -- players can move over each others tokens, and tokens can move an infinite amount of tiles. The console should be warning you about this on every move. Let's fix that. 

For checkers, there's two types of valid moves (that we're concerned about for this tutorial). First, it could be a normal move where we jump one tile diagonally up or down (for red and white, respectively). Or, it could be a jump move. Let's define our isValidMove() function and those helpers.
```
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
```
If you get an error about a function not existing - be sure that the methods are above the inheritance declaration.

Notice that we could include double jumps here with a few more lines of code - after this tutorial, try it yourself!

**You can refresh the game at this point to try moving around** Invalid moves should raise an error in the console, and you shouldn't be able to perform anything illegal. The console should also be warning you that playerDidWin should be implemented. Let look at that now.


### Game Over

At this point, there's only one more thing we need to define in our game class to get a working game: how do we tell who won the game? The default TurnMap will call the bool function game.playerDidWin(player) to find out this information. Let's implement that now: 
```
    CheckersGame.prototype.playerDidWin = function(player) { 
      var otherPlayer = (this.players[0] == player) ? this.players[1] : this.players[0];
      if(otherPlayer !== undefined){
        var tokens = otherPlayer.tokens;
        for (var tokenIdx in tokens) { 
          if (tokens[tokenIdx]) return false;
        } 
      } else {
        return false;
      }
      return true;
    };

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
```

getPlayerForToken is added as a helper method as a means of finding out whether the oposing player has any tokens left.

That completes a working game of checkers. Congratulations! 

**Reload your checkers.html file again!** You should be able to play checkers to your heart's content.

Now that move onto implementing networking for your checkers game.

## Networking

TableTop networking allows you to send the important details of the game onto another client so the two can play a game against each other. 

First we need to get our local server up and running. To do this run the "node server.js" command from your terminal. Now you should be able to load your game through the local server. It is served up on port 3000. **Go to  http://localhost:3000/checkers.html and you should be able to play your game.** 

Next, we are going to add the game starting module to checkers.html. There are two elemnets that need to be added in. First is the socket.io Javascript. Add the following inside the <body> tags but below the <div class="game-table">: 
```
        <script src="/socket.io/socket.io.js"></script>
        <script>
          var socket = io();
        </script>
```
The second snippet that needs to be added in the game-setup modals. These can be added just inside the <div class="game-table"> tag: 
```
            <div class="game-setup modal">
                <div class="game-start init-modal">
                    <div href="#" class="button show-join-game">Join Game</div>
                    <div href="#" class="button show-new-game">Create Game</div>
                </div>
                <div class="join-start init-modal hidden">
                    <input type="text" name="gameID" placeholder="Game ID" class="joingame-id init-input">
                    <input type="text" name="playerName" placeholder="John Smith" class="player-name init-input"><br>
                    <div href="#" class="button join-game">Join Game</div>
                </div>
                <div class="waiting-for-start init-modal hidden">
                    <div class="waiting">Waiting for creater to start game...</div>
                </div>
                <div class="create-start init-modal hidden">
                    <input type="text" name="playerName" placeholder="John Smith" class="player-name init-input">
                    <div href="#" class="button new-game">Create Game</div>
                </div>
                <div class="created-start init-modal hidden">
                    <div class="gamecode">Game Code: </div>
                    <div href="#" class="button start-game">Start Game</div>
                </div>               
            </div>
```
**Reload your checkers.html file** You should be able to see and interact with the game set-up modals. You will not be able to start a game yet, but let sort that out. 

To start a game, we need to be listening for start (and other) messages sent ot the game. Open up checkers.js. Remove the "checkers.updateToStartState();" line as the game will now be started when the "game initiated" message is received. Add the following code at the end of the file to set-up message receivers:
```
      socket.on('move made', function(msg) {
        checkers.createFromJSONString(msg);
      });

      socket.on('game created', function(msg) {
        checkers.gameCreated(msg);
      });

      socket.on('message received', function(msg) {
        checkers.messageReceived(msg);
      });

      socket.on('game initiated', function(msg) {
        checkers.initiated();
      });

      PlayerFactory = function(type) {
        switch(type) {

          default:
            return new TableTop.Player();
        }
      }

      TokenFactory = function(type){
        switch(type) {
          case "Token":
            return new TableTop.Token();
          default:
            return new TableTop.Token();
        }
      }
```
In addition to the message receiver we also created a PlayerFactory and TokenFactory to help recreate Players and Tokens when they are sent via messages. 


Next in order to make the game fully networked and playable over the local server we need to add methods to turn the board and game into objects to be send via messages. In checkers_board.js, add the following: 
```
  CheckerBoard.prototype.getJSONString = function() {
    var tiles = [];
    for (var y = 0; y < this.height; y++){
      for (var x = 0; x < this.width; x++) {
        var tileText = this.tiles[x][y].getJSONString();
        tiles.push(tileText);
      }
    }
    return tiles;
  };

  CheckerBoard.prototype.createFromJSONString = function(data) {
    for (var y = 0; y < this.height; y++){
      for (var x = 0; x < this.width; x++) {
        var tile = this.tiles[x][y];
        tile.createFromJSONString(data[x + (this.width * y)]);
      }
    }
  };
```
And then in checkers_game.js add similar methods: 
```
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
```
There is the additional method in checkers_game that overwrites the gameCreated.js in game.js to help cater to some of the unique features of starting a Checkers game.   


Anddd we're done! Congratulations on your first TableTop.js game! 

**Reload your checkers.html file one last time!** You should be able to play across two open tabs to your heart's content.

### Conclusion

If you're ready for more game development, try implementing double jump and token upgrades upon reaching the end of the board (hint: you might need to subclass token for the latter case). If you'd rather move on from checkers, look at our other example projects (Monopoly and Settlers of Catan) for ways you can leverage our framework to create more complex games.

Happy gaming! 

TableTop.js Team
