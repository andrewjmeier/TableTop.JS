require("./board/boardConstants.js");
var Property = require("./board/properties/property.js");
// var Turn = require("../../tabletop/core/turn.js");
var TableTop = require('../../tabletop/tabletop');
var inherits = require('util').inherits;

function MonopolyTurn(game) {
    this.game = game;

    this.turnMap = new TableTop.Turn({
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
                    this.game.message = this.game.players[game.currentPlayer].name + ": Click 'Continue' to roll dice.";;
                },

                yes_continue : function() {
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
                    var property = this.game.board.tiles[player.position];
                    if (player.canBuy(property)) {
                        this.game.message = this.game.message.concat("Do you want to buy it?");
                    } else {
                        this.game.message = this.game.message.concat("You can't afford it.");
                        this.transition("postTurn");
                    }
                },

                yes_continue : function() {
                    var player = this.game.getCurrentPlayer();
                    var property = this.game.board.tiles[player.position];
                    player.buy(property);
                    this.game.message = "You bought " + property.name + ". ";
                    this.transition("postTurn");
                },

                no_trade_clear : function() {
                    //btn is no in this case
                    var player = this.game.getCurrentPlayer();       
                    var property = this.game.board.tiles[player.position];
                    this.game.message = "You didn't buy " + property.name + ". ";
                    this.transition("postTurn");
                }
            },

            postTurn: {
                _onEnter : function() {
                    this.game.message = this.game.message.concat("Choose an option (trade, buy houses, etc), or click continue to end your turn");
                },

                yes_continue: function() {
                    this.transition("endedTurn");
                },

                no_trade_clear : function() {
                    //btn is trade in this case
                    this.transition("proposeTrade")
                }
            },

            proposeTrade: {
                _onEnter : function() {
                    this.game.createTrade();
                    this.game.message = "Click the items you want to trade. Choose 1 person and items. Then click continue.";
                },

                yes_continue: function() {
                    if(this.game.trade.allDetails()){
                      this.transition("tradeAnswer")
                    } else {
                      alert("Please select all details for a full trade");
                    }
                },

                no_trade_clear : function() {
                    //btn is clear in this case
                    this.game.cancelTrade();
                },

                cancel: function() {
                    this.game.cancelTrade();
                    this.game.message = "Trade cancelled. ";
                    this.transition("postTurn");
                }
            },

            tradeAnswer: {
                _onEnter : function() {
                    this.game.message = this.game.trade.answeringPlayer.name + ", do you want to trade with " + this.game.trade.proposingPlayer.name + "?" + "\nThey are " + this.game.trade.itemsToString();
                },

                yes_continue : function() {
                    this.game.trade.completeTrade();
                    this.game.message = "You traded. ";
                    this.game.clearTrade();
                    this.transition("postTurn");
                },

                no_trade_clear : function() {
                    //btn is no in this case
                    this.game.message = "You didn't trade. ";
                    this.game.cancelTrade();
                    this.transition("postTurn");

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

MonopolyTurn.prototype.updateState = function(click) {
    this.turnMap.handle(click);
};

MonopolyTurn.prototype.getCurrentState = function() {
    return this.turnMap.compositeState();
};

module.exports = MonopolyTurn;