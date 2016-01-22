var Turn = require("./turn.js");
var inherits = require('util').inherits;

function ManualTurn(game, startView, view, gameOverView, nextPlayerView) { 
  
  this.game = game;
  this.startView = startView;
  this.view = view;
  this.nextPlayerView = nextPlayerView;
  this.gameOverView = gameOverView;

  this.turnMap = new Turn({ 
    initialize: function( options ) {},
    
    game : game, 

    initialState: "uninitialized",
    
    namespace: "test",

    states: { 
      
      // 1
      uninitialized: { 
        start : function() { 
          this.transition("startScreen");
          
        } 
      },

      // 1a
      startScreen:{
        _onEnter: function() { 
          startView.drawView();
        },
        play : function() { 
          startView.removeView();
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
          nextPlayerView.drawView();
        },
        goToTurn : function() { 
          nextPlayerView.removeView();
          this.transition("waitingForMove");
        } 
      },

      // 2 
      waitingForMove: { 
        _onEnter: function() { 
          view.drawView();
          console.log(this.game.getCurrentPlayer().name + ": Make your move.");
        },
        
        makeMove : function() { 
          if (game.hasValidMove()) { 
            game.executeMove();
            this.transition("postTurn");
          } else { 
            console.log("Invalid move. Try again.");
          } 
        } 
      },

      // 3
      postTurn: { 
        _onEnter : function() { 
          if (this.game.playerDidWin(game.getCurrentPlayer())) { 
            view.removeView();
            this.transition("gameOver");
          } else { 
            this.game.nextPlayer();
            if(game.showNextPlayerScreen){
              view.hideView();
              this.transition("nextPlayerScreen");
            } else {
              this.transition("waitingForMove");
            }
          }
        } 
      },

      // 4
      gameOver : { 
        _onEnter : function() { 
          gameOverView.drawView();
          console.log(this.game.getCurrentPlayer().name + " has won.");
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
