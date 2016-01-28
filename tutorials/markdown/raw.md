# Raw Framework Quickstart Guide

This is a quick and dry explanation of how to use TableTop.JS to its full effectiveness. 
For a softer introduction, check out our Checkers and SimpleGame tutorials. 

## (yourgamehere).js file 

This is your main game file. Here, you build the important components and start the animation rendering. All main game files will basically look the same, except you'll be substituting in your subclasses for the defaults as needed. 

The main components are the Board, Game, Players, TurnMap, and View. You'll need to subclass at least the Board, Game, and View. For basic games, you'll be able to use the default Player class, as well as the default TurnMap. More advanced logic can be implemented in a custom TurnMap (see our MonopolyTurn file to see how to create a game of that complexity) and custom player objects. 


## The Board 

For your custom Board class, there's two main things you'll have to do. First, you need to build tiles for your game (using new TableTop.Tile()) and store them in this.tiles. Secondly, you'll likely need to build tokens for your game (using new TableTop.Token()). In checkers, tokens are the pieces. In tic-tac-toe, tokens are the Xs and Os. Again, these should be stored in this.tokens.

## The Game 

The game class will be home to alot of your game logic. Check our demos for the options you can (and should) set in your constructor. It's important to override executeMove(), isValidMove(token, old, new), and playerDidWin(player). In Checkers, executeMove() is where we call token.moveToTile() and remove any jumped tokens. isValidMove() is pretty self explanatory - return true if the token should be able to move from one tile to the other, and false otherwise. Same with playerDidWin() - just return true if that player won the game (ie. the other player has no tokens left, or that player has reached 3 in a row, etc). 

## The View 

Your view class can be simple, but very powerful. There's two main functions you should override: drawTile(tile, size) and drawToken(token, size). In these functions, you need to create a new Pixi.Graphics objects (using new Pixi.Graphics()). You should then edit the object to look how you want it to. In checkers, we fill the tokens/tiles with the appropriate colors (by checking the .color variables on the param objects tile and token), and drawing a rectangle/circle depending on what we want. However, you can place images on your objects and customize them in many ways - check out the pixi documentation for cool stuff you can do using their library (http://pixijs.github.io/docs/PIXI.Graphics.html).

## Still Unclear? 

Try looking at our Checkers and SimpleGame tutorials in conjunction with this guide. Hopefully that makes things clearer. If you're still confused, reach out to us at tabletopjs@gmail.com and we'll be happy to help you get started, add specific features, or clarify topics. 