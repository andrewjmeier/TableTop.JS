# Demo - Checkers

In this demo, we'll be creating a simple checkers game. For simplicity sake, we'll exclude some of the more complicated rules - most notably, we won't be upgrading tokens when they hit the last row, and we won't be allowing double jumps. Hopefully by the end of this tutorial you'll be able to add those on your own!

When you create a game, there are 5 major components: the Players, Game, Board, TurnMap, and View. As we'll learn shortly, these classes, with very little configuration, can be extremely powerful and do alot of the heavy lifting for you.

### Checkers.js -- Your Main File

To begin, create a new file checkers.js in the root of your project folder. This will be the file that the framework looks for to builds your game. Some parts of this may be confusing to you; don't worry about that right now, we'll be explaining everything shortly. 

    // Start creating your game here

    // Our 5 Main Components
    var TableTop = require('tabletop-boardgames');
    var Checkers = require('./checkers/checkers_game');
    var CheckerBoard = require('./checkers/checkers_board');
    var CheckerView = require('./checkers/checkers_view');

    // create the players
    var redPlayer = new TableTop.Player("Red", 1);
    var whitePlayer = new TableTop.Player("White", 2);
    var players = [redPlayer, whitePlayer];

    // create the Board, Game, and TurnMap
    var board = new CheckerBoard();
    var checkers = new Checkers(players, board);
    var turnMap = new TableTop.ManualTurn(checkers);
    checkers.setTurnMap(turnMap);


    // create our view, and draw it
    var view = new CheckerView(checkers, turnMap);
    view.drawBoard();

    // this initiates the TurnMap ("Gameloop") and 
    // gets the ball rolling!
    checkers.updateState("start");



This is all you need for the main game file. In general, your (game).js file should never be much longer than this -- you should offload the complicated logic to your subclasses of the five main game components (like we will do with Checkers and CheckerBoard).

Before continuing, let's go over what we're doing above. First, we create two players, passing their names. We chose Red and White so we can easily refer to the players later by color to identify who's turn it is, but for other games (like our monopoly example) we'll use actual names like "John" or "KC". Then, we create our Board, Game, TurnMap and View. We pass the turnMap to our game, and tell the View to draw our board. Once we call view.drawBoard(), the view graphics loop begins it's animation loop. However, our game doesn't begin running until we update the TurnMap state to "start", which begins to run our game.

### The Game

At this point, you'll be getting an error that checkers/checkers_game.js and checkers/checkers_board.js don't exist - let's fix that and create those now. 

In checkers_game.js, enter the following: 

    var inherits = require('util').inherits;
    var TableTop = require('tabletop-boardgames');

    function CheckersGame(players, board, turnMap) {
      TableTop.Game.call(this, players, board, turnMap);
      this.currentPlayer = 0;
      this.moveType = TableTop.Constants.moveTypeManual;
      this.moveEvaluationType = TableTop.Constants.moveEvalationTypeGameEvaluator;
      board.tokens.forEach(function(token) { 
        var player = token.color == TableTop.Constants.redColor ? players[0] : players[1];
        token.owner = player;
        player.tokens.push(token);
      });
    };

    inherits(CheckersGame, TableTop.Game);

    module.exports = CheckersGame;

This is the constructor for our game. We overwrite a few important defaults here. 

First, we set the moveType to TableTop.Constants.moveTypeManual. Game defaults to using TableTop.Constants.moveTypeDiceRoll, which is useful for games like monopoly where there's only one path the follow, however we want the user to be able to control where she moves her token. This flag lets our view know that it should add click listeners to tokens and tiles in our view, and lets our game know that it should store these listener events as they arrive for later evaluation.

Second, we set the moveEvaluationType to TableTop.Constants.moveEvaluationTypeGameEvaluator. This lets our game know that it will be doing to move evaluation rather than the tiles. When we set this flag, the TurnMap will call "executeMove()" on our game class to decide what the side effects of a move are. 

### The Board

We'll finish filling out our game class later. For now, let's move on to the checkers_board class. Create the file and enter the following: 

    var inherits = require('util').inherits;
    var TableTop = require('tabletop-boardgames');

    function CheckerBoard() { 
      TableTop.GridBoard.call(this, 8, 8);
      this.buildTiles();
      this.buildTokens();
    }       

    inherits(CheckerBoard, TableTop.GridBoard);


    CheckerBoard.prototype.buildTiles = function() { 
      var tileColor = TableTop.Constants.redColor;
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

First, we subclass GridBoard. PathBoard (for games like monopoly) and GraphBoard (for games like Settlers of Catan) are available, but those are more complex to implement. Then, we build the tiles for our game. We alternate colors black and red to create the checkerboard effect. 

### The View

Now let's work on our view. We need to tell the board how we want our tokens and tiles to look. Our framework uses Pixi.js for graphics support -- check out their docs for different options you can use to create different graphics objects for your game. Create the file checkers/checkers_view.js and add the following: 

    var TableTop = require("tabletop-boardgames");
    var inherits = require('util').inherits;

    function CheckerView(game, turnMap) {
      TableTop.View.call(this, game, turnMap);
    }

    inherits(CheckerView, TableTop.View);

    CheckerView.prototype.drawTile = function(tile, size) {

      var tileView = new PIXI.Graphics();
      tileView.lineStyle(1, 0, 1); 
      tileView.beginFill(tile.color, 1); 
      tileView.drawRect(0, 0, size.width, size.height);
      return tileView;

    };

    CheckerView.prototype.drawToken = function(token, size) {

      var tokenView = new PIXI.Graphics();
      tokenView.lineStyle(1, 0, 1);
      tokenView.beginFill(token.color, 1);
      tokenView.drawCircle(size.width/2, size.height/2, size.width/2 - 20);
      return tokenView;

    };

    module.exports = CheckerView;

That's all we need for the view for the rest of the tutorial. The rest of the logic is handled by the framework. It recognizes the board type and can draw the board and tokens accordingly. 

**You should be able to load your test.html file and see a checkerboard drawn.** If not, go back and make sure you didn't miss anything. Note: even though we told the framework how we want our tokens drawn, it recognizes that we haven't added any to the board and therefor doesn't draw them.

Next, let's create our "tokens". Tokens are the movable, actionable objects that belong to players. In a game like checkers, they're our pieces. In a game like monopoly, it's the literal token that represents your player. 

Add the following method to your checkers_board.js file, and call it from your constructer after this.BuildTiles():

    CheckerBoard.prototype.buildTokens = function() { 

        // define coordinates for red and white tokens
        var redX = [0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6];
        var redY = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
        var whiteX = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];
        var whiteY = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7];

        // build the tokens
        var tile;
        for (var i = 0; i < redX.length; i++) { 

            tile = this.getTile(redX[i], redY[i]);
            this.buildTokenForTile(tile, TableTop.Constants.redColor);

            tile = this.getTile(whiteX[i], whiteY[i]);
            this.buildTokenForTile(tile, TableTop.Constants.whiteColor);
        }
    };

    // creates the token for given tile and color, 
    // adds it to the tile, 
    // and appends it to our list of tokens
    CheckerBoard.prototype.buildTokenForTile = function(tile, color) { 
        var token = new TableTop.Token(null, tile, color);
        tile.addOccupier(token);
        this.tokens.push(token);
    };


That's all we need for the checkers_board.js file! 

**Reload your test.html file and you should see the tokens draw on the board.** As you can see, the framework can powerfully do alot of the heavy lifting if you properly define your board, tokens, and tiles. 

Now, let's move back to checkers_game.js and add some of the game logic. Since we're using TableTop.Constants.moveEvaluationTypeGameEvaluator, the framework expects our game to have the functions executeMove() and isValidMove(). executeMove() should perform all of the game logic necessary for a given move. Note: it doesn't need to do any graphics work: that's all handled for you!  

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
  
        // grab the occupier of the tile that we jumped
        // if we didn't jump anything, this will return null - that's what we want!
        if (newPos.x > oldPos.x)
            return this.board.getTile(oldPos.x + 1, oldPos.y + yModifier).occupier;
        else  
            return this.board.getTile(oldPos.x - 1, oldPos.y + yModifier).occupier;
    
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
           newTile.occupier) 
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

**Reload your test.html file one last time!** You should be able to play checkers to your hearts content.

### Conclusion

If you're ready for more game development, try implementing double jump and token upgrades upon reaching the end of the board (hint: you might need to subclass token for the latter case). If you'd rather move on from checkers, look at our other example projects (Monopoly and Settlers of Catan) for ways you can leverage our framework to create more complex games.

Happy gaming! 

TableTop.js Team