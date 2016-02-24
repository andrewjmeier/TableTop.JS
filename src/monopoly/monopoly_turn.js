require("./board/boardConstants.js");
var Property = require("./board/properties/property.js");
// var Turn = require("../../tabletop/core/turn.js");
var TableTop = require('../../tabletop/tabletop');
var inherits = require('util').inherits;

function MonopolyTurn(game) {
    TableTop.Component.call(this);
    this.game = game;

    var context = this;

    this.turnMap = new TableTop.Turn({
        initialize: function( options ) {
        },

        game : game,

        initialState: "setup",

        namespace: "test",

        states: {
            uninitialized: {
                start : function() {
                    this.transition("setup");
                }
            },

            setup: {
                yes_continue: function() {
                    this.transition("waitingOnRoll");
                }
            },

            waitingOnRoll: {
                _onEnter: function() {
                    this.game.message = this.game.players[this.game.currentPlayer].name + ": Click 'Continue' to roll dice.";;
                },

                yes_continue : function() {
                    this.transition("rolled");
                }
            },

            rolled: {
                _onEnter : function() {
                    var actions = this.game.rollAndMovePlayer();
                    context.sendMessage(actions[0]);
                    this.game.message = actions[0];
                    this.transition(actions[1]);
                }
            },

            buyPrompt: {
                _onEnter : function() {
                    var player = this.game.getCurrentPlayer();
                    var token = player.tokens[0];
                    var property = this.game.board.findTileForToken(token);
                    if (player.canBuy(property)) {
                        this.game.message = this.game.message.concat("Do you want to buy it?");
                    } else {
                        this.game.message = this.game.message.concat("You can't afford it.");
                        this.transition("postTurn");
                    }
                },

                yes_continue : function() {
                    var player = this.game.getCurrentPlayer();
                    var token = player.tokens[0];
                    var property = this.game.board.findTileForToken(token);
                    player.buy(property);
                    this.game.message = "You bought " + property.name + ". ";
                    this.transition("postTurn");
                },

                no_trade_clear : function() {
                    //btn is no in this case
                    var player = this.game.getCurrentPlayer();
                    var token = player.tokens[0];       
                    var property = this.game.board.findTileForToken(token);
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
                    game.sendData();
                    console.log(this.game.getCurrentPlayer());
                }
            }
        }
    });

    this.turnMap.on("transition", function() {
        context.sendMessage("refreshView", "view");
    });
};

inherits(MonopolyTurn, Component);

MonopolyTurn.prototype.updateState = function(message) {
    this.turnMap.handle(message);
};

MonopolyTurn.prototype.getCurrentState = function() {
    return this.turnMap.compositeState();
};

module.exports = MonopolyTurn;