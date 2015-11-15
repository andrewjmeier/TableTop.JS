var Turn = require("./turn.js");
var inherits = require('util').inherits;

function ManualTurn(game) { 
  
  this.game = game;
  this.turnMap = new Turn({ 
    initialize: function( options ) {
      console.log("tests");
    },
    
    game : game, 

    initialState: "uninitialized",
    
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
          game.message = this.game.getCurrentPlayer().name + ": Make your move.";
        },
        
        makeMove : function() { 
          if (game.hasValidMove()) { 
            game.evaluateMove();
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

ManualTurn.prototype.updateState = function(command) {
    this.turnMap.handle(command);
};

ManualTurn.prototype.getCurrentState = function() {
    return this.turnMap.compositeState();
};


module.exports = ManualTurn;
