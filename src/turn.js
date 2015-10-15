var UI = require("./UI.js");

var ui = new UI();

function Turn() {};

Turn.prototype.nextState = function(yesPressed, monopoly) {
    //need a switch here to see state
    console.log(monopoly.players[monopoly.currentPlayer]);
    monopoly.rollAndMovePlayer();
    console.log(monopoly.dice);
    console.log(monopoly.players[monopoly.currentPlayer]);
    monopoly.nextPlayer();

    console.log("\n\n");
    ui.displayPrompt("Next round");
    /*
    switch(state%3) {
        case 0:
            
            break;
        case 1:
            
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        default:
            //something is broken
            console.log("Something went very wrong");
    } 
    */
};

module.exports = Turn;