var Turn = require("turn");
var inherits = require('util').inherits;

function ManualTurn(game) { 
  
  this.game = game;
  this.turnMap = new Turn({ 
    initialize: function( options ) {
      console.log("tests");
    },
    
    game : game, 

    initialState: "waitingForMove",
    
    namespace: "test",

    states: { 
      
      // 1
      uninitialized: { 
        start : function() { 
          this.transition("waitingForMove");
        } 
      },
      
      // 2 
      waitingForMove: { 
        _onEnter: function() { 
          game.message = this.game.getcurrentPlayer().name + ": Make your move.";
        },
        
        makeMove : function() { 
          var player = this.game.getCurrentPlayer();
          if (game.isValidMove(player.moveData)) { 
            game.moveToken(player.moveData);
            this.transition("postTurn");
          } else { 
            this.game.message = "Invalid move. Try again.";
          } 
        } 
      },
      
      // 3
      postTurn: { 
        _onEnter : function() { 
          this.game.message = "Move made.";
          if (this.game.getCurrentPlayer().hasWon()) { 
            this.transition("gameOver");
          } else { 
            this.game.nextPlayer();
            this.transition("waitingForMove");
          }
        } 
      },

      gameOver : { 
        _onEnter : function() { 
          this.game.message = this.game.getCurrentPlayer() + "has won.";
        } 
      } 
      
    } 
    
  });
  
} 
