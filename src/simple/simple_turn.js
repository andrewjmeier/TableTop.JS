require("../board/boardConstants.js");
var Turn = require("../turn");
var inherits = require('util').inherits;

function SimpleTurn() {
  Turn.call(this);
};

inherits(SimpleTurn, Turn);

/*
 Couple notes on how this works:

 The state machine loop will run until:
  1) we return early (should be preceeded with a ui.displayPrompt(msg)
  2) the state doesn't change.
 This allows to us to run multiple states without waiting for user input...
 ie. we can run BUY_ANSWER and then POST_TURN immediately after

 The way "actions" work is that "performLandingAction" returns two values
 in an array:
 actions[0] contains a message to append to the display
 actions[1] contains the next state we should forward the user to

 Most spaces/cards return "POST_TURN" as the state in actions[1], but
 some (like housing properties) will return something else (ie. BUY_PROMPT).

 Displaying the prompt message works buy initializing displayMsg at the beginning
 of the fn call, and then building up the message (using .concat) during the entire
 state run. When we exit (either by default, or by an early return) we use
 ui.displayPrompt(displayMsg) to print everything to the console. We do this because
 if we use ui.displayPrompt multiple times in a row, then previous msgs get overridden.
*/

SimpleTurn.prototype.runStateMachine = function(yesPressed, game) {
  console.log("HERE", game.state, yesPressed);

  // only changes on fn call so we call this outside the while loop
  var player = game.getCurrentPlayer();

  // this gets refreshed in ROLLED
  var space = game.board.spaces[game.getCurrentPlayer().position];
  var displayMsg = "";

  while (this.lastState != game.state) {

    switch(game.state) {

    case WAITING_FOR_ROLL:

      displayMsg = displayMsg.concat(game.players[game.currentPlayer].name + ": Click 'Continue' to roll dice.");

      // get out of state machine early here
      // next time we return, we'll have rolled the dice
      this.setState(ROLLED, game);
      game.message = displayMsg;
      console.log(game.message);
      return;

    case ROLLED:
      //roll dice
      //after landing do you want to buy/you can’t buy
      var actions = game.roll();
      space = game.board.spaces[game.getCurrentPlayer().position];

      displayMsg = displayMsg.concat(actions[0]);
      this.setState(WAITING_FOR_ROLL, game);
      game.nextPlayer();
      break;

    default:
      //something is broken
      // console.log("Something went very wrong");
    }
    game.message = displayMsg;
  }

};

module.exports = SimpleTurn;
