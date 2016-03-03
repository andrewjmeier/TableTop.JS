# Demo - Checkers

In this demo, we'll be creating a simple checkers game. For simplicity sake, we'll exclude some of the more complicated rules - most notably, we won't be upgrading tokens when they hit the last row, and we won't be allowing double jumps. Hopefully by the end of this tutorial you'll be able to add those features by yourself!

When you create a game, there are 5 major components: the Players, Game, Board, TurnMap, and View. As we'll learn shortly, these classes, with very little configuration, can be extremely powerful and do a lot of the heavy lifting for you.

### Checkers.js -- Your Main File

To begin, create a new file checkers.js in the root of your project folder. This will be the file that the framework looks for to builds your game. Some parts of this may be confusing to you; don't worry about that right now, we'll be explaining everything shortly. 

    // Checkers.js
    // Start creating your game here

    // Our 4 Main Components
    var TableTop = require('tabletop-boardgames');
    var Checkers = require('./checkers/checkers_game');
    var CheckerBoard = require('./checkers/checkers_board');
    var CheckerView = require('./checkers/checkers_view');

    // create the Board and Game
    var board = new CheckerBoard();
    var checkers = new Checkers(board);
    
    // create view components
    var startView = new TableTop.StartView(checkers);
    var view = new CheckerView(checkers);
    var nextPlayerView = new TableTop.NextPlayerView(checkers);
    var gameOverView = new TableTop.GameOverView(checkers);

    // create the last main component, which is turnmap
    var turnMap = new TableTop.ManualTurn(checkers, startView, view, gameOverView, nextPlayerView);
    checkers.setTurnMap(turnMap);

    // this initiates the TurnMap ("Gameloop") and 
    // gets the ball rolling!
    checkers.updateState("start");



This is all you need for the main game file. In general, your (game).js file should never be much longer than this -- you should offload the complicated logic to your subclasses of the five main game components (like we will do with Checkers and CheckerBoard).

Before continuing, let's go over what we're doing above. First, we create our Board and Game. Then we made the various views and eventually turnmap. The start view will take in player names. We set the turnMap of our game, start in the first state. The turnmap acts as the controller showing and removing the views we needed. It also begins to run our game when we update the state. 

### The Game

At this point, you'll be getting an error that checkers/checkers_game.js and checkers/checkers_board.js don't exist - let's fix that and create those now. 

In checkers_game.js, enter the following: 
    
    // checkers_game.js
    var inherits = require('util').inherits;
    var TableTop = require('tabletop-boardgames');
    var CheckerBoard = require('./checkers_board');
    
    // constructor of the game
    function CheckersGame(board) {
      TableTop.Game.call(this, board);
      this.currentPlayer = 0;
      
      // default is moveTypeDiceRoll (Monopoly type game), so set the type as moveTypeManual
      // so that a user can click a token and move it to wherever he wants.
      this.moveType = TableTop.Constants.moveTypeManual;
      
      // let the game know that it should evaluate moves rather than tiles
      this.moveEvaluationType = TableTop.Constants.moveEvalationTypeGameEvaluator;
      
      // declare number of possible players which is 2 in this case.
      // this can go up for different games, but for Checkers we need exactly two players
      this.possibleNumPlayers = [2];
      this.showNextPlayerScreen = false;
    };
    inherits(CheckersGame, TableTop.Game);


    module.exports = CheckersGame;

This is the constructor for our game. We overwrite a few important defaults here. 

First, we set the moveType to TableTop.Constants.moveTypeManual. Game defaults to using TableTop.Constants.moveTypeDiceRoll, which is useful for games like monopoly where there's only one path the follow, however we want the user to be able to control where she moves her token. This flag lets our view know that it should add click listeners to tokens and tiles in our view, and lets our game know that it should store these listener events as they arrive for later evaluation.

Second, we set the moveEvaluationType to TableTop.Constants.moveEvaluationTypeGameEvaluator. This lets our game know that it will be doing to move evaluation rather than the tiles. When we set this flag, the TurnMap will call "executeMove()" on our game class to decide what the side effects of a move are. 

Next, we set an array of possible number of players. Here we specify that checkers has to be played with two players. We also set showNextPlayerScreen to false. This is a useful flag to set to true if player hold information that they will not want other players to see and allows players to pass the computer. 

### The Board

We'll finish filling out our game class later. For now, let's move on to the checkers_board class. Create the file and enter the following: 
    
    // checkers_board.js
    var inherits = require('util').inherits;
    var TableTop = require('tabletop-boardgames');
    
    // constructor for Checkers board
    function CheckerBoard() { 
      
      // we will subclass gridboard that has 8 by 8 dimension
      TableTop.GridBoard.call(this, 8, 8);
      
      // call helper function
      this.buildTiles();
    }       

    inherits(CheckerBoard, TableTop.GridBoard);

    // helper function to create tiles with alternate colors (black and red)
    CheckerBoard.prototype.buildTiles = function() { 
      
      // first, declare tile color as red
      var tileColor = TableTop.Constants.redColor;
      var tile;
      
      // loop through the column
      for (var y = 0; y < this.height; y++) {
        
        // if the tileColor is currently red, set the color as black
        tileColor = (tileColor == TableTop.Constants.redColor) ? TableTop.Constants.blackColor : TableTop.Constants.redColor;
        
        // loop through the row
        for (var x = 0; x < this.width; x++) {
            
            // create a tile and insert into the tiles array with color
            tile = new TableTop.Tile({color: tileColor});
            this.tiles[x][y] = tile;
            tileColor = (tileColor == TableTop.Constants.redColor) ? TableTop.Constants.blackColor : TableTop.Constants.redColor;
        }
      } 
    };

    module.exports = CheckerBoard;

First, we subclass GridBoard. PathBoard (for games like monopoly) and GraphBoard (for games like Settlers of Catan) are available, but those are more complex to implement. Then, we build the tiles for our game. We alternate colors black and red to create the checkerboard effect. 

### The View

Now let's work on our view. We need to tell the board how we want our tokens and tiles to look. Our framework uses Pixi.js for graphics support -- check out their docs for different options you can use to create different graphics objects for your game. Create the file checkers/checkers_view.js and add the following: 
    
    // checkers_view.js
    var TableTop = require("tabletop-boardgames");
    var inherits = require('util').inherits;
    
    // constructor for the view
    function CheckerView(game) {
      TableTop.View.call(this, game);
    }

    inherits(CheckerView, TableTop.View);
    
    // function to draw a tile
    CheckerView.prototype.drawTile = function(tile, size) {
      
      // using PIXI graphics library to draw a tile
      var tileView = new PIXI.Graphics();
      tileView.lineStyle(1, 0, 1); 
      tileView.beginFill(tile.color, 1); 
      tileView.drawRect(0, 0, size.width, size.height);
      return tileView;
    };
    
    // function to draw a token
    CheckerView.prototype.drawToken = function(token, size) {
      
      // using PIXI graphics library to draw a token 
      var tokenView = new PIXI.Graphics();
      tokenView.lineStyle(1, 0, 1);
      tokenView.beginFill(token.color, 1);
      tokenView.drawCircle(size.width/2, size.height/2, size.width/2 - 20);
      return tokenView;
    };

    module.exports = CheckerView;

That's all we need for the view for the rest of the tutorial. The rest of the logic is handled by the framework. It recognizes the board type and can draw the board and tokens accordingly. 

**You should be able to load your test.html file and see a checkerboard drawn.** If not, go back and make sure you didn't miss anything. Note: we have not told our board to build the tokens yet and therefore you will not see them

Next, let's create our "tokens". Tokens are the movable, actionable objects that belong to players. In a game like checkers, they're our pieces. In a game like monopoly, it's the literal token that represents your player. 


Add the following method to your checkers_board.js file, and call it from your constructer after this.BuildTiles():
    
    // function to actually build tokens
    CheckerBoard.prototype.buildTokens = function() { 

        // define coordinates for red and white tokens
        var redX = [0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6];
        var redY = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
        var whiteX = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];
        var whiteY = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7];

        // build the tokens
        var tile;
        
        // loop through the array of an array (all four arrays have the same length)
        for (var i = 0; i < redX.length; i++) { 
            
            // get the tile on that position and build a token for that tile (red)
            tile = this.getTile(redX[i], redY[i]);
            this.buildTokenForTile(tile, TableTop.Constants.redColor);
            
            // get the tile on that position and build a token for that tile (white)
            tile = this.getTile(whiteX[i], whiteY[i]);
            this.buildTokenForTile(tile, TableTop.Constants.whiteColor);
        }
    };

    // creates the token for given tile and color, 
    // adds it to the tile, 
    // and appends it to our list of tokens
    CheckerBoard.prototype.buildTokenForTile = function(tile, color) { 
        var token = new TableTop.Token(null, tile, color);
        tile.addToken(token);
        this.tokens.push(token);
    };



To call the buildTokens function from the constructors of the checkers_board.js file use this.buildTokens();. The constructor should now look like this:

    function CheckerBoard() { 
      TableTop.GridBoard.call(this, 8, 8);
      this.buildTiles();
      this.buildTokens();
    }     

That's all we need for the checkers_board.js file! 

Now go back to the checkers_game.js file. We need to overwrite the setPlayers(players) method to assign token owners. Add the following code block after the constructor.
  
  // function to assign the tokens to each player
  CheckersGame.prototype.setPlayers = function(players) {
    
    // players is an array of two players who are playing the game
    this.players = players;
    
    // for each token
    this.board.tokens.forEach(function(token) {
      
      // check the color of the token and assign to the correct player
      var player = token.color == TableTop.Constants.redColor ? players[0] : players[1];
      token.owner = player;
      player.tokens.push(token);
    });
  };


**Reload your test.html file and you should see the tokens draw on the board.** As you can see, the framework can powerfully do alot of the heavy lifting if you properly define your board, tokens, and tiles. 

Now, let's continue with checkers_game.js and add some of the game logic. Since we're using TableTop.Constants.moveEvaluationTypeGameEvaluator, the framework expects our game to have the functions executeMove() and isValidMove(). executeMove() should perform all of the game logic necessary for a given move. Note: it doesn't need to do any graphics work: that's all handled for you!  

### Evaluating Moves

Lets write our executeMove() function. This function should assume that there's a valid move stored in this.proposedMove (in the form of proposedMove.token and proposedMove.destination). 

    CheckersGame.prototype.executeMove = function() {  

        // store proposedMove data for convenience
        var token = this.proposedMove.token;
        var destination = this.proposedMove.destination;
        
        // get positions of current token tile and the destination
        var oldPosition = this.board.getTilePosition(token.tile);
        var newPosition = this.board.getTilePosition(destination);
  
        // check if we jumped a token, and remove it if so 
        var jumpedToken = this.getJumpedToken(token, oldPosition, newPosition);
        
        if (jumpedToken)
            jumpedToken.destroy();
  
        // move the token to the new tile and clear proposedMove
        token.moveToTile(destination);
        this.proposedMove = {};
    };

    CheckersGame.prototype.getJumpedToken = function(token, oldPos, newPos) { 

        // are we moving up or down? 
        var yModifier = token.color == TableTop.Constants.redColor ? 1 : -1;
  
        // grab the token of the tile that we jumped
        // if we didn't jump anything, this will return null - that's what we want!
        if (newPos.x > oldPos.x)
            return this.board.getTile(oldPos.x + 1, oldPos.y + yModifier).tokens[0];
        else  
            return this.board.getTile(oldPos.x - 1, oldPos.y + yModifier).tokens[0];
    
    };

Now, refresh your test.html and you should be able to move tokens around. Notice that the game has no concept of what should be a valid move or not -- players can move each others tokens, and tokens can move an infinite amount of tiles. The console should be warning you about this on every move. Let's fix that. 

For checkers, there's two types of valid moves (that we're concerned about for this tutorial). First, it could be a normal move where we jump one tile diagonally up or down (for red and white, respectively). Or, it could be a jump move. Let's define our isValidMove() function and those helpers.

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
        if (token.owner != player || 
           newTile.color == TableTop.Constants.redColor || 
           newTile.tokens[0]) 
         return false;

        return this.validNormalMove(token, oldPos, newPos, 1) || 
          this.validJumpMove(token, oldPos, newPos);  
    };

    CheckersGame.prototype.validNormalMove = function(token, oldPos, newPos, moveLen) { 
  
        // are we moving up or down? 
        var yModifier = token.color == TableTop.Constants.redColor ? moveLen : -moveLen;
        return oldPos.y + yModifier == newPos.y && Math.abs(oldPos.x - newPos.x) == moveLen;

    };

    CheckersGame.prototype.validJumpMove = function(token, oldPos, newPos) { 
    
        // make sure it's a valid normal move that's two tiles long
        if (!this.validNormalMove(token, oldPos, newPos, 2)) return false;
  
        // make sure we jump an enemy token 
        var jumpedToken = this.getJumpedToken(token, oldPos, newPos);
        return jumpedToken && jumpedToken.color != token.color;

    };

If you get an error about a function not existing - be sure that the methods are above the inheritance declaration.

Notice that we could include double jumps here with a few more lines of code - after this tutorial, try it yourself!

You can refresh the game at this point to try moving around - invalid moves should raise an error in the console, and you shouldn't be able to perform anything illegal. 

### Game Over

At this point, there's only one more thing we need to define in our game class (as indicated by the warnings in the console): how do we tell who won the game? The default TurnMap will call the bool function game.playerDidWin(player) to find out this information. Let's implement that now: 

    CheckersGame.prototype.playerDidWin = function(player) { 
       var otherPlayer = (this.players[0] == player) ? this.players[1] : this.players[0];
       var tokens = otherPlayer.tokens;
       for (var tokenIdx in tokens) { 
           if (tokens[tokenIdx]) return false;
       } 
  
       return true;
    };


Anddd we're done! Congratulations on your first TableTop.js game! 

**Reload your test.html file one last time!** You should be able to play checkers to your heart's content.

### Conclusion

If you're ready for more game development, try implementing double jump and token upgrades upon reaching the end of the board (hint: you might need to subclass token for the latter case). If you'd rather move on from checkers, look at our other example projects (Monopoly and Settlers of Catan) for ways you can leverage our framework to create more complex games.

Happy gaming! 

TableTop.js Team
