var UI = require("./UI.js");
var Property = require("./board/properties/property.js");
//var Space = require('../board/space');

var ui = new UI();

function Turn() {};

Turn.prototype.viewState = function(yesPressed, monopoly) {
    console.log(monopoly.state);
    switch(monopoly.state) {
        case 0:
            //before rolling
            console.log(monopoly.players[monopoly.currentPlayer].name);
            
            var msg0 = monopoly.players[monopoly.currentPlayer].name
            msg0 = msg0.concat("'s turn to roll the dice. Click 'Continue' to roll dice.");
            ui.changeToContinue();
            ui.displayPrompt(msg0);
            monopoly.setState(1);
            
            
            break;
        case 1:
            //roll dice
            //after landing do you want to buy/you can’t buy
            monopoly.rollAndMovePlayer();
            console.log(monopoly.dice);
            var msg1 = "You rolled "
            var thisSpace = monopoly.board.spaces[monopoly.getCurrentPlayer().position]
            var propName = thisSpace.name;

            console.log(thisSpace);
            var buyMsg = "";

            if(thisSpace.canBuy(monopoly)){
                buyMsg = "Do you want to buy it?";
                ui.changeToYesNo();
            }
            else{
                if(thisSpace.own(monopoly)){
                    buyMsg = "You own it.";
                    ui.changeToContinue();
                }
                else{
                    if(thisSpace.oweRent(monopoly)){
                        buyMsg = "You paid rent.";
                        ui.changeToContinue();
                    }
                }
            }
            msg1 = msg1.concat(monopoly.dice, ". You landed on ", propName, ". ", buyMsg);
            ui.displayPrompt(msg1);
            monopoly.setState(2);
            
            break;
        case 2:
            //do all things they wanted eg buy
            var thisSpace = monopoly.board.spaces[monopoly.getCurrentPlayer().position]
            var propName = thisSpace.name;
            var buyMsg = "";
            if(thisSpace.canBuy(monopoly)){
                if(yesPressed){
                    thisSpace.buyProperty(monopoly.getCurrentPlayer());
                    buyMsg = buyMsg.concat("You bought ", propName, ". ");
                }
            }
            //do you want to end your turn
            var msg2 = "";
            msg2 = msg2.concat(buyMsg, "Do you want to end your turn?");
            ui.changeToYesNo();
            ui.displayPrompt(msg2);
            monopoly.setState(3);
            
            break;
        case 3:
            //allow them to trade etc
            var msg3 = "";
            if(yesPressed){
                msg3 = msg3.concat("Your turn is over");
                ui.changeToContinue();
                ui.displayPrompt(msg3);
                monopoly.nextPlayer();
                monopoly.setState(0);
                console.log("\n\n");
            }
            else{
                msg3 = msg3.concat("Click yes to end turn");
                ui.displayPrompt(msg3);
                console.log("This is where we allow trade etc");

            }
            
            break;
        default:
            //something is broken
            console.log("Something went very wrong");
    } 
    
};

module.exports = Turn;