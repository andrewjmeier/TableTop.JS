require("./board/boardConstants.js");
var Property = require("./board/properties/property.js");
var Turn = require("../turn");
var inherits = require('util').inherits;

function MonopolyTurn(game) {
    this.game = game;

    this.turnMap = new Turn({
        initialize: function( options ) {
            console.log("tests");
        },

        game : game,

        initialState: "waitingOnRoll",

        namespace: "test",

        states: {
            uninitialized: {
                start : function() {
                    this.transition("waitingOnRoll");
                }
            },
            waitingOnRoll: {
                _onEnter: function() {
                    game.message = this.game.players[game.currentPlayer].name + ": Click 'Continue' to roll dice.";;
                },

                yes : function() {
                    this.transition("rolled");
                }
            },

            rolled: {
                _onEnter : function() {
                    var actions = this.game.rollAndMovePlayer();
                    this.game.message = actions[0];
                    this.transition(actions[1]);
                }
            },

            buyPrompt: {
                _onEnter : function() {
                    var player = this.game.getCurrentPlayer();
                    var property = this.game.board.spaces[player.position];
                    if (player.canBuy(property)) {
                        this.game.message = "Do you want to buy it?";
                    } else {
                        this.game.message = "You can't afford it.";
                        this.transition("postTurn");
                    }
                },

                yes : function() {
                    var player = this.game.getCurrentPlayer();
                    var property = this.game.board.spaces[player.position];
                    player.buy(property);
                    this.game.message = "You bought " + property.name + ". ";
                    this.transition("postTurn");
                },

                no : function() {
                    var player = this.game.getCurrentPlayer();       
                    var property = this.game.board.spaces[player.position];
                    this.game.message = "You didn't buy " + property.name + ". ";
                    this.transition("postTurn");
                }
            },

            postTurn: {
                _onEnter : function() {
                    this.game.message = "Choose an option (trade, buy houses, etc), or click continue to end your turn";
                },

                yes: function() {
                    this.transition("endedTurn");
                }
            },

            endedTurn: {
                _onEnter : function() {
                    this.game.clearActiveCard();
                    this.game.nextPlayer();
                    this.transition("waitingOnRoll");
                }
            }
        }
    });
};

// <<<<<<< HEAD
// inherits(MonopolyTurn, Turn);

// /*
//  Couple notes on how this works:

//  The state machine loop will run until:
//   1) we return early (should be preceeded with a ui.displayPrompt(msg)
//   2) the state doesn't change.
//  This allows to us to run multiple states without waiting for user input...
//  ie. we can run BUY_ANSWER and then POST_TURN immediately after

//  The way "actions" work is that "performLandingAction" returns two values
//  in an array:
//  actions[0] contains a message to append to the display
//  actions[1] contains the next state we should forward the user to

//  Most spaces/cards return "POST_TURN" as the state in actions[1], but
//  some (like housing properties) will return something else (ie. BUY_PROMPT).

//  Displaying the prompt message works buy initializing displayMsg at the beginning
//  of the fn call, and then building up the message (using .concat) during the entire
//  state run. When we exit (either by default, or by an early return) we use
//  ui.displayPrompt(displayMsg) to print everything to the console. We do this because
//  if we use ui.displayPrompt multiple times in a row, then previous msgs get overridden.

// Possible states defined in boardConstants
// */

// MonopolyTurn.prototype.runStateMachine = function(btnPressed, game) {

//   // only changes on fn call so we call this outside the while loop
//   var player = game.getCurrentPlayer();

//   // this gets refreshed in ROLLED
//   var space = game.board.spaces[game.getCurrentPlayer().position];
//   var displayMsg = "";

//   while (this.lastState != game.state) {

//     switch(game.state) {

//     case WAITING_FOR_ROLL:

//       console.log(game.players[game.currentPlayer].name);

//       displayMsg = displayMsg.concat(game.players[game.currentPlayer].name + ": Click 'Continue' to roll dice.");

//       // get out of state machine early here
//       // next time we return, we'll have rolled the dice
//       this.setState(ROLLED, game);
//       game.message = displayMsg;
//       return;

//     case ROLLED:
//       //roll dice
//       //after landing do you want to buy/you can’t buy
//       var actions = game.rollAndMovePlayer();
//       space = game.board.spaces[game.getCurrentPlayer().position];

//       console.log(game.dice);
//       console.log(space);

//       displayMsg = displayMsg.concat(actions[0]);
//       this.setState(actions[1], game);
//       break;

//     case BUY_PROMPT:

//       var property = space; // clarity

//       if(player.canBuy(property)){
//         displayMsg = displayMsg.concat("Do you want to buy it?");
//         this.setState(BUY_ANSWER, game);
//         game.message = displayMsg;
//         return;
//       } else {
//         displayMsg = displayMsg.concat("You can't afford it. \n");
//         this.setState(POST_TURN, game);
//       }

//       break;

//     case BUY_ANSWER:

//       if (btnPressed == BTN1) {
//         player.buy(space);
//         displayMsg = displayMsg.concat("You bought " + space.name + ". ");
//       } else {
//         displayMsg = displayMsg.concat("You didn't buy " + space.name + ". ");
//       }

//       this.setState(POST_TURN, game);
//       break;

//     case POST_TURN:
//       // ask them to trade, etc.
//       displayMsg = displayMsg.concat("\n Choose an option (trade, buy houses, etc), or click continue to end your turn");
//       this.setState(POST_TURN_ANSWER, game);
//       game.message = displayMsg;
//       return;

//     case POST_TURN_ANSWER:
//       // TODO: do stuff with their answer... send them to trade, mortage, etc.
//       // ie. this.setState(TRADE, game) or this.setState(MORTAGE_CHOICES, game)
//       game.clearActiveCard();
      
//       if (btnPressed == BTN1) {
//         this.setState(ENDED_TURN, game);
//       } else {//trade clicked
//         displayMsg = displayMsg.concat("\n Click the items you want to trade. Choose 1 person and items. Then click continue.");
//         this.setState(PROPOSE_TRADE, game);
//         game.message = displayMsg;
//         return;
//       }
      
//       break;

//     case PROPOSE_TRADE:
//       if (btnPressed == BTN1) {
//         if(game.trade.allDetails()){
//           displayMsg = displayMsg.concat("\n" + game.trade.answering_player.name + ", do you want to trade with " + game.trade.proposing_player.name + "?");
//           displayMsg = displayMsg.concat("\nThey are " + game.trade.itemsToString());
//           this.setState(TRADE_ANSWER, game);
//           game.message = displayMsg;
//         } else {
//           alert("Please select all details for a full trade");
//         }
//         return;
        
//       } else if (btnPressed == BTN2){
//         console.log("clear");
//         game.clearTrade();
//         return;
//       } else{
//         game.clearTrade();
//         displayMsg = displayMsg.concat("\nTrade cancelled. ");
//         this.setState(POST_TURN_ANSWER, game);
//       }
      
      

//     case TRADE_ANSWER:

//       if (btnPressed == BTN1) {
//         game.trade.completeTrade();
//         displayMsg = displayMsg.concat("You traded.");
//       } else {
//         displayMsg = displayMsg.concat("You didn't trade. ");
//       }
//       game.clearTrade();
//       this.setState(POST_TURN, game);
//       break;


//     case ENDED_TURN:

//       game.nextPlayer();
//       this.setState(WAITING_FOR_ROLL, game);
//       console.log("\n\n");
//       break;

//     default:
//       //something is broken
//       console.log("Something went very wrong");
//     }
//     game.message = displayMsg;

//   }
// =======
MonopolyTurn.prototype.updateState = function(click) {
    this.turnMap.handle(click);
};
//>>>>>>> 36516ef81d4380cca9d78026fc5bb0d194a99090

MonopolyTurn.prototype.getCurrentState = function() {
    return this.turnMap.compositeState();
};

module.exports = MonopolyTurn;
