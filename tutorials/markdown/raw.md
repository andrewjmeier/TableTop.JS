# Raw Framework Quickstart Guide

This is a quick and dry explanation of how to use TableTop.JS to its full effectiveness. 
For a softer introduction, check out our Checkers and SimpleGame tutorials. 

## (yourgamehere).js file 

This is your main game file. Here, you build the important components and start the animation rendering. All main game files will basically look the same, except you'll be substituting in your subclasses for the defaults as needed. 

The main components are the Board, Game, Players, TurnMap, and View. You'll need to subclass at least the Board, Game, and View. For basic games, you'll be able to use the default Player class, as well as the default TurnMap. More advanced logic can be implemented in a custom TurnMap (see our MonopolyTurn file to see how to create a game of that complexity) and custom player objects. 


## The Board 

For your custom Board class, there's two main things you'll have to do. First, you need to build tiles for your game (using `new TableTop.Tile()`) and store them in this.tiles. Secondly, you'll likely need to build tokens for your game (using `new TableTop.Token()`). Tokens are any objects that go on the board that's also associated with a player. In checkers, tokens are the pieces. In tic-tac-toe, tokens are the Xs and Os. Again, these should be stored in this.tokens.

##### Board Types 

There are two main board types: GridBoard and ArrayBoard. A Gridboard is stored as a two dimensional array; it's essentially a matrix. For example, you'd use a GridBoard for checkers, chess, or tic-tac-toe. An ArrayBoard is stored as you'd expect - an array. You'd use it for games like Monopoly, Game of Life, etc. 

## The Game 

The game class will be home to all of your game logic. Check our demos for the options you can (and should) set in your constructor. It's important to override `executeMove()`, `isValidMove(token, old, new)`, and `playerDidWin(player)`. In Checkers, `executeMove()` is where we call token.moveToTile() and remove any jumped tokens. It should ideally perform all of your game logic and consequences associated with a player making a move. `isValidMove()` is pretty self explanatory - return true if the token should be able to move from one tile to the other, and false otherwise. Same with `playerDidWin()` - just return true if that player won the game (ie. the other player has no tokens left, or that player has reached 3 in a row, etc). 

### Move Types 

There are three main move types right now in the framework. 

##### moveTypeManual

First, there's moveTypeManual. This move type is meant for games that involve players taking turns moving tokens around the board (specifically, by clicking on a token and then a space - ie. checkers, chess, etc.). With this flag, the general workflow by the framework is as such: 

If the user clicks a token and then a space, and is in the state "waitingForMove", store the token and space in game.proposedMove
If isValidMove() then executeMove()

##### moveTypePlaceToken

Next is moveTypePlaceToken. This move type is for games that alternate players placing tokens on the board. The classic example of when to use this move type is tic-tac-toe. The workflow of the framework is similar to that of moveTypeManual: 

If the user clicks on a tile and the state is "waitingForMove", store the space 
If isValidMove() then executeMove() 

##### moveTypeCustom 

If your desired gameflow isn't one of the above, then you should use moveTypeCustom. You can still use the default ManualTurn turnmap, but you'll need to override a few important methods in your game. First, you'll need to override hasValidMove. Check the docs for how it's implemented by default. Your implementation should look something like this: 

    CustomGame.prototype.hasValidMove = function() { 

        // grab args from proposedMove object
        // validate the the needed args != NULL
                                                                            
        return this.isValidMove(args);
    }

Secondly, you'll need to override tileClicked and tokenClicked to fit your needs. These methods are called everytime the user clicks on a tile or token, so make sure the game is in an appropriate state to read the inputs, and then store the variables in game.proposedMove as needed. Check our default implementations for examples on how we do that. 

## The View 

Your view class can be simple, but very powerful. There's two main functions you should override: `drawTile(tile, size)` and `drawToken(token, size)`. In these functions, you need to create a new Pixi.Graphics objects (using `new Pixi.Graphics()`). You should then edit the object to look how you want it to. In checkers, we fill the tokens/tiles with the appropriate colors (by checking the .color variables on the param objects tile and token), and drawing a rectangle/circle depending on what we want. However, you can place images on your objects and customize them in many ways - check out the pixi documentation for cool stuff you can do using their [library](http://pixijs.github.io/docs/PIXI.Graphics.html).

## The TurnMap

To make a custom turnmap other than ManualTurn, refer to the [Machina docs](http://machina-js.org/). Check out our MonopolyTurn to see how you could implement a dice rolling game. 

## Constants 

We've defined a bunch of constants for you to make your life easier - colors, sizes, etc. Check the ttconstants.js file to view them all. 

## Still Unclear? 

Try looking at our Checkers and SimpleGame tutorials in conjunction with this guide. Hopefully that makes things clearer. If you're still confused, reach out to us at tabletopjs@gmail.com and we'll be happy to help you get started, add specific features, or clarify topics. 