var Turn = require("./turn.js");
var AIPlayer = require("./aiplayer.js");
var inherits = require('util').inherits;

function ManualTurn(game) { 
  
  this.game = game;

  this.turnMap = new Turn({ 
    initialize: function( options ) {},
    
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

      // 1a
      startScreen:{
        _onEnter: function() { 
        },
        play : function() { 
          if(game.showNextPlayerScreen){
            this.transition("nextPlayerScreen");
          } else {
            this.transition("waitingForMove");
          }
        } 
      },

      // 1b
      nextPlayerScreen:{
        _onEnter: function() { 

        },
        goToTurn : function() { 
          this.transition("waitingForMove");
        } 
      },

      // 2 
      waitingForMove: { 
        _onEnter: function() { 
          // console.log("waitingForMove", this.game.getCurrentPlayer(), this.game.board);
          if (this.game.getCurrentPlayer().isAI()) {
          //if (this.game.getCurrentPlayer() instanceof AIPlayer) {
            var AIMove = this.game.getCurrentPlayer().generateMove(this.game);
            game.proposedMove = AIMove;
            this.handle("makeMove");
          }
        },
        
        makeMove : function() { 
          
          if (game.hasValidMove()) {
            if (this.game.getCurrentPlayer().isAI()) {
            //if (this.game.getCurrentPlayer() instanceof AIPlayer) {
              var turnMap = this;
              setTimeout(function() { game.executeMove(); turnMap.transition("postTurn"); }, 500);
            } else { 
              game.executeMove();
              this.transition("postTurn");
            }          
          } else { 
            alert("Invalid move. Try again.");
            console.log("Invalid move. Try again.");
          } 
        } 
      },
      
      // 3
      postTurn: { 
        _onEnter : function() { 
          if (this.game.playerDidWin(game.getCurrentPlayer())) { 
            this.transition("gameOver");
          } else { 
            // console.log("this.game.players", this.game.players);
            this.game.nextPlayer();
            // console.log("Next player");
            if(game.showNextPlayerScreen){
              this.transition("nextPlayerScreen");
            } else {
              this.transition("waitingForMove");
            }
          }
          game.sendData();
        } 
      },

      // 4
      gameOver : { 
        _onEnter : function() { 
          console.log(this.game.getCurrentPlayer().name + " has won.");
        }
      } 
    } 
  });  
} 


/**
 * executes the command in a state
 * @param {string} command - the command in the state to exercise
 * @returns {void}
*/
ManualTurn.prototype.updateState = function(command) {
    this.turnMap.handle(command);
};

/**
 * gets the current state
 * @returns {string}
*/
ManualTurn.prototype.getCurrentState = function() {
    return this.turnMap.compositeState();
};


module.exports = ManualTurn;
