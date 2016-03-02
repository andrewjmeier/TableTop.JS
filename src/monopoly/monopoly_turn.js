require("./board/boardConstants.js");
var Property = require("./board/properties/property.js");
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
                continue: function() {
                    this.transition("waitingOnRoll");
                }
            },

            waitingOnRoll: {
                _onEnter: function() {
                    // this.game.sendMessage(this.game.players[this.game.currentPlayer].name + ": Roll the dice.");
                    var context = this;
                    var buttons = [ {
                        text: "Roll",
                        id: "roll",
                        onClick: function() {
                            context.handle("roll");
                        }
                      }
                    ];

                    this.game.sendMessage(buttons, "set buttons");

                },

                roll : function() {
                    this.transition("rolled");
                }
            },

            rolled: {
                _onEnter : function() {
                    var nextState = this.game.rollAndMovePlayer();
                    this.transition(nextState);
                }
            },

            buyPrompt: {
                _onEnter : function() {
                    var player = this.game.getCurrentPlayer();
                    var token = player.tokens[0];
                    var property = this.game.board.findTileForToken(token);
                    if (player.canBuy(property)) {
                        // this.game.sendMessage("Do you want to buy it?");

                        var context = this;
                        var buttons = [ {
                            text: "Yes",
                            id: "yes",
                            onClick: function() {
                                context.handle("yes");
                            }
                        }, 
                        {
                            text: "No",
                            id: "no",
                            onClick: function() {
                                context.handle("no");
                            }
                        }
                        ];

                        this.game.sendMessage(buttons, "set buttons");


                    } else {
                        // this.game.sendMessage("You can't afford it.");
                        this.transition("postTurn");
                    }
                },

                yes : function() {
                    var player = this.game.getCurrentPlayer();
                    var token = player.tokens[0];
                    var property = this.game.board.findTileForToken(token);
                    player.buy(property);
                    this.transition("postTurn");
                },

                no : function() {
                    //btn is no in this case
                    var player = this.game.getCurrentPlayer();
                    var token = player.tokens[0];       
                    var property = this.game.board.findTileForToken(token);
                    // this.game.sendMessage("You didn't buy " + property.name + ". ");
                    this.transition("postTurn");
                }
            },

            postTurn: {
                _onEnter : function() {
                    // this.game.sendMessage("Do you want to trade, build, or end your turn?");
                    var context = this;
                    var buttons = [ {
                        text: "Trade",
                        id: "trade",
                        onClick: function() {
                            context.handle("trade");
                        }
                    }, 
                    {
                        text: "Buy Houses",
                        id: "buy-houses",
                        onClick: function() {
                            context.handle("buy_houses");
                        }
                    },
                    {
                        text: "End Turn",
                        id: "end-turn",
                        onClick: function() {
                            context.handle("continue");
                        }
                    }
                    ];

                    this.game.sendMessage(buttons, "set buttons");
                },

                continue: function() {
                    this.transition("endedTurn");
                },

                trade : function() {
                    //btn is trade in this case
                    this.transition("proposeTrade")
                },

                buy_houses: function() {
                    alert("can't buy houses right now");
                    // this.transition("endedTurn");
                }
            },

            proposeTrade: {
                _onEnter : function() {
                    this.game.createTrade();
                    // this.game.sendMessage("Click the items you want to trade. Choose 1 person and items. Then click continue.");
                    var context = this;
                    var buttons = [ {
                        text: "Continue",
                        id: "continue",
                        onClick: function() {
                            context.handle("offer_trade");
                        }
                    }, 
                    {
                        text: "Cancel",
                        id: "cancel",
                        onClick: function() {
                            context.handle("cancel");
                        }
                    },
                    ];

                    this.game.sendMessage(buttons, "set buttons");
                    this.game.sendMessage("refreshView", "view");
                },

                offer_trade: function() {
                    if(this.game.trade.allDetails()){
                      this.transition("tradeAnswer")
                    } else {
                      alert("Please select all details for a full trade");
                    }
                },

                cancel: function() {
                    this.game.cancelTrade();
                    // this.game.sendMessage("Trade cancelled. ");
                    this.transition("postTurn");
                }
            },

            tradeAnswer: {
                _onEnter : function() {
                    // this.game.sendMessage(this.game.trade.answeringPlayer.name + ", do you want to trade with " + this.game.trade.proposingPlayer.name + "?" + "\nThey are " + this.game.trade.itemsToString());
                    console.log(this.game.trade.answeringPlayer.name + ", do you want to trade with " + this.game.trade.proposingPlayer.name + "?" + "\nThey are " + this.game.trade.itemsToString());

                    var context = this;
                    var buttons = [ {
                        text: "Yes",
                        id: "yes",
                        onClick: function() {
                            context.handle("yes");
                        }
                    }, 
                    {
                        text: "No",
                        id: "no",
                        onClick: function() {
                            context.handle("No");
                        }
                    },
                    ];

                    this.game.sendMessage(buttons, "set buttons");
                },

                yes : function() {
                    this.game.trade.completeTrade();
                    // this.game.sendMessage("You traded. ");
                    this.game.clearTrade();
                    this.transition("postTurn");
                },

                no : function() {
                    //btn is no in this case
                    // this.game.sendMessage("You didn't trade. ");
                    this.game.cancelTrade();
                    this.transition("postTurn");

                },

                _onExit: function() {
                    this.game.sendMessage("refreshView", "view");
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

    this.turnMap.on("transition", function(event) {
        if (event.toState !== "rolled" && event.toState !== "endedTurn") {
            console.log("sending", event.toState);
            context.game.sendState(event.toState);            
        }
        context.sendMessage("refreshView", "view");
    });
};

inherits(MonopolyTurn, Component);

MonopolyTurn.prototype.updateState = function(message) {
    this.turnMap.handle(message);
};

MonopolyTurn.prototype.transitionTo = function(state) {
    this.turnMap.transition(state);
};

MonopolyTurn.prototype.getCurrentState = function() {
    return this.turnMap.compositeState();
};

module.exports = MonopolyTurn;
