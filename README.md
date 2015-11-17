# TableTop.JS

## TableTop.JS will be designed to embody the following principles:

* Oriented toward new developers
* Rapidly publishable
* Flexible but simple
* Well-documented and testable
* Advanced features for veteran developers

## How to setup environment

* Download npm `brew install npm`
* Download webpack `npm install -g webpack`
* npm install (needed whenever there's an update to node modules) `npm install`
* Compile JS `npm run webpack`
* To run the tests `npm run test`

## How to use TableTop.JS

### Setup a new project

Take a look at some of our example projects to get a feel for how they're setup. You can view all of our examples as well as our documentation [here] (http://andrewjmeier.github.io/TableTop.JS) or you can check out [Monopoly](http://github.com/andrewjmeier/Monopoly) or [Settlers of Catan](http://github.com/andrewjmeier/Settlers). 

#### If you're new to JavaScript and npm, try using our [TableTopSkeleton](http://github.com/andrewjmeier/TableTopSkeleton) to get started. 

* Click on `Fork` on the top right of the page. This will create a new repository for you to create your boardgame. 
* Next find the link on the right side of the page under `HTTPS clone URL`. Copy this link
* Open up the `Terminal` application on your computer and enter `git clone` followed by the URL from above that you copied.
* `Press Enter`. This will download the project to your computer and setup git which is a version control system. You can learn all about git from [github](https://try.github.io/levels/1/challenges/1). 
* Then enter `cd TableTopSkeleton`
* Followed by `npm install`. This will download some external dependencies for your project (including the TableTop framework)
* Open the package.json file to customize the project for your boardgame (you can enter `open .` in the terminal to show the folder in Finder)
* You'll want to edit a bunch of lines in this file: 
  * Add the name of your game `"name": "your-game-name-here"`  
  * Update the description of your game `"description": "A board game using TableTop.JS"`
  * Add the link to your github repository ```"repository": {
    "type": "git",
    "url": "git+https://github.com/your-github-user-name/your-project-name.git"
  }```
  * Add yourself as the author of the project `"author": "FirstName LastName <youremail@email.com>"`
  * Add your github repo's issues page ```"bugs": {
    "url": "https://github.com/your-github-user-name/your-project-name/issues"
  }```
  * Change the homepage `"homepage": "https://github.com/your-github-user-name/your-project-name#readme"`
* Add your code in the `/src` directory
* Enter `npm run webpack` in the Terminal
* You're all set! Open the `index.html` file and check out your game!

#### If npm is nothing new to you, just use `npm install tabletop-boardgames` to get started! 

# Demo - Checkers

## checkers.js

In this demo, we'll be creating a simple checkers game. For simplicity sake, we'll exclude some of the more complicated rules - most notably, we won't be upgrading tokens when they hit the last row, and we won't be allowing double jumps. Hopefully by the end of this tutorial you'll be able to add those on your own!

When you create a game, there are 5 major components: the Players, Game, Board, TurnMap, and View. As we'll learn shortly, these classes, with very little configuration, can be extremely powerful and do alot of the heavy lifting for you.

To begin, create a new file checkers.js in the root of your project folder. This will be the file that the framework looks for to builds your game. Some parts of this may be confusing to you; don't worry about that right now, we'll be explaining everything shortly. 
   
    // Import necessary modules
    var Player = require("./player.js"); 
    var Checkers = require("./checkers/checker_game.js");
    var CheckerBoard = require("./checkers/checker_board.js");
    var ManualTurn = require("./manualTurn.js");
    var CheckerView = require("./checkers/checker_view.js");
    
    // create the players
    var redPlayer = new Player({name: "Red"});
    var whitePlayer = new Player({name: "White"});
    var players = [redPlayer, whitePlayer];
    
    // create the Board, Game, and TurnMap
    var board = new CheckerBoard();
    var checkers = new Checkers(players, board);
    var turnMap = new ManualTurn(checkers);
    checkers.setTurnMap(turnMap);

   
    // create our view, and draw it
    var view = new CheckerView(checkers, turnMap);
    view.drawBoard();

    // this initiates the TurnMap ("Gameloop") and 
    // gets the ball rolling!
    checkers.updateState("start");
    

This is all you need for the main game file. In general, your (game).js file should never be much longer than this -- you should offload the complicated logic to your subclasses of the five main game components (like we will do with Checkers and CheckerBoard).

Before continuing, let's go over what we're doing above. First, we create two players, passing their names. We chose Red and White so we can easily refer to the players later by color to identify who's turn it is, but for other games (like our monopoly example) we'll use actual names like "John" or "KC". Then, we create our Board, Game, TurnMap and View. We pass the turnMap to our game, and tell the View to draw our board. Once we call view.drawBoard(), the view graphics loop begins it's animation loop. However, our game doesn't begin running until we update the TurnMap state to "start", which begins to run our game.

At this point, you'll be getting an error that checkers/checker_game.js and checkers/checker_board.js don't exist - let's fix that and create those now. 

In checker_game.js, enter the following: 

    var inherits = require('util').inherits;
    var Game = require("../game.js");
    var c = require("../ttConstants.js");

    function CheckersGame(players, board, turnMap) {
        Game.call(this, players, board, turnMap);
        this.currentPlayer = 0;
        this.moveType = c.moveTypeManual;
        this.moveEvaluationType = c.moveEvalationTypeGameEvaluator;
        board.tokens.forEach(function(token) { 
            var player = token.color == c.redColor ? players[0] : players[1];
            token.owner = player;
            player.tokens.push(token);
        });
    };

    inherits(CheckersGame, Game);

    module.exports = CheckersGame;

This is the constructor for our game. We overwrite a few important defaults here. 

First, we set the moveType to c.moveTypeManual. Game defaults to using c.moveTypeDiceRoll, which is useful for games like monopoly where there's only one path the follow, however we want the user to be able to control where she moves her token. This flag lets our view know that it should add click listeners to tokens and spaces in our view, and lets our game know that it should store these listener events as they arrive for later evaluation.

Second, we set the moveEvaluationType to c.moveEvaluationTypeGameEvaluator. This lets our game know that it will be doing to move evaluation rather than the spaces. When we set this flag, the TurnMap will call "evaluateMove()" on our game class to decide what the side effects of a move are. 

We'll finish this class later. For now, let's move on to the checker_board class. Create the file and enter the following: 

    var inherits = require('util').inherits;
    var GridBoard = require("../board/gridBoard.js");
    var Space = require("../board/space.js");
    var Token = require("../token.js");
    var c = require("../ttConstants.js");

    function CheckerBoard() { 
        GridBoard.call(this, 8, 8);
        this.buildTiles();
    }       

    inherits(CheckerBoard, GridBoard);


    CheckerBoard.prototype.buildTiles = function() { 
        var tileColor = c.redColor;
        var tile;
        for (var y = 0; y < this.height; y++) {
            tileColor = (tileColor == c.redColor) ? c.blackColor : c.redColor;
            for (var x = 0; x < this.width; x++) {
                tile = new Space({color: tileColor});
                this.spaces[x][y] = tile;
                tileColor = (tileColor == c.redColor) ? c.blackColor : c.redColor;
            }
        } 
    };


    module.exports = CheckerBoard;

First, we subclass GridBoard. PathBoard (for games like monopoly) and GraphBoard (for games like Settlers of Catan) are available, but those are more complex to implement. Then, we build the tiles for our game. We alternate colors black and red to create the checkerboard effect. 

Now let's work on our view. We need to tell the board how we want our tokens and tiles to look. Our framework uses Pixi.js for graphics support -- check out their docs for different options you can use to create different graphics objects for your game. Create the file checkers/checker_view.js and add the following: 

    var c = require("../ttConstants.js");
    var View = require("../view.js");
    var inherits = require('util').inherits;

    function CheckerView(game, turnMap) {
        View.call(this, game, turnMap);
    }

    inherits(CheckerView, View);

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

That's all we need for the view for the rest of the tutorial. The rest of the logic is handled by the framework. It recognizes the board type and can draw the board and tokens accordingly. Now, you should be able to load your test.html file and see a checkerboard drawn. If not, go back and make sure you didn't miss anything. Note that even though we told the framework how we want our tokens drawn, it recognizes that we haven't added any to the board and therefor doesn't draw them.

Next, let's create our "tokens". Tokens are the movable, actionable objects that belong to players. In a game like checkers, they're our pieces. In a game like monopoly, it's the literal token that represents your player. 

Add the following method to your check_board.js file, and call it from your constructer after this.BuildTiles():

    CheckerBoard.prototype.buildTokens = function() { 

        // define coordinates for red and white tokens
        var redX = [0, 2, 4, 6, 1, 3, 5, 7, 0, 2, 4, 6];
        var redY = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
        var whiteX = [1, 3, 5, 7, 0, 2, 4, 6, 1, 3, 5, 7];
        var whiteY = [5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7];

        // build the tokens
        var space;
        for (var i = 0; i < redX.length; i++) { 

            space = this.getSpace(redX[i], redY[i]);
            this.buildTokenForSpace(space, c.redColor);

            space = this.getSpace(whiteX[i], whiteY[i]);
            this.buildTokenForSpace(space, c.whiteColor);
        }
    };

    // creates the token for given space and color, 
    // adds it to the space, 
    // and appends it to our list of tokens
    CheckerBoard.prototype.buildTokenForSpace = function(space, color) { 
        var token = new Token(null, space, color);
        space.addOccupier(token);
        this.tokens.push(token);
    };


That's all we need for the checker_board.js file! Reload your test.html file and you should see the tokens draw on the board. As you can see, the framework can powerfully do alot of the heavy lifting if you properly define your board, tokens, and spaces. 

Now, let's move back to checker_game.js and add some of the game logic. Since we're using c.moveEvaluationTypeGameEvaluator, the framework expects our game to have the functions evaluateMove() and isValidMove(). evaluateMove() should perform all of the game logic necessary for a given move. Note: it doesn't need to do any graphics work: that's all handled for you!  

Lets write our evaluateMove() function. This function should assume that there's a valid move stored in this.proposedMove (in the form of proposedMove.token and proposedMove.destination). 

    CheckersGame.prototype.evaluateMove = function() {  

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

Now, refresh your test.html and you should be able to move tokens around. Notice that the game has no concept of what should be a valid move or not -- players can move each others tokens, and tokens can move an infinite amount of spaces. The console should be warning you about this on every move. Let's fix that. 

For checkers, there's two types of valid moves (that we're concerned about for this tutorial). First, it could be a normal move where we jump one space diagonally up or down (for red and white, respectively). Or, it could be a jump move. Let's define our isValidMove() function and those helpers.

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


Notice that we could include double jumps here with a few more lines of code -- after this tutorial, try it yourself!

You can refresh the game at this point to try moving around - invalid moves should raise an error in the console, and you shouldn't be able to perform anything illegal. 

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

Reload your test.html file and you should be able to play checkers to your hearts content.

If you're ready for more game development, try implementing double jump and token upgrades upon reaching the end of the board (hint: you might need to subclass token for the latter case). If you'd rather move on from checkers, look at our other example projects (Monopoly and Settlers of Catan) for ways you can leverage our framework to create more complex games.

Happy gaming! 

TableTop.js Team
