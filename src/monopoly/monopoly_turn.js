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
                yes_continue: function() {
                    this.transition("waitingOnRoll");
                }
            },

            waitingOnRoll: {
                _onEnter: function() {
                    this.game.message = this.game.players[this.game.currentPlayer].name + ": Click 'Continue' to roll dice.";
                    var context = this;
                    var buttons = [ {
                        text: "Roll",
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
                    // context.sendMessage(actions[0]);
                    // this.game.message = actions[0];
                    this.transition(nextState);
                }
            },

            buyPrompt: {
                _onEnter : function() {
                    var player = this.game.getCurrentPlayer();
                    var token = player.tokens[0];
                    var property = this.game.board.findTileForToken(token);
                    if (player.canBuy(property)) {
                        this.game.message = this.game.message.concat("Do you want to buy it?");

                        var context = this;
                        var buttons = [ {
                            text: "Yes",
                            onClick: function() {
                                context.handle("yes");
                            }
                        }, 
                        {
                            text: "No",
                            onClick: function() {
                                context.handle("no");
                            }
                        }
                        ];

                        this.game.sendMessage(buttons, "set buttons");


                    } else {
                        this.game.message = this.game.message.concat("You can't afford it.");
                        this.transition("postTurn");
                    }
                },

                yes : function() {
                    var player = this.game.getCurrentPlayer();
                    var token = player.tokens[0];
                    var property = this.game.board.findTileForToken(token);
                    player.buy(property);
                    this.game.message = "You bought " + property.name + ". ";
                    this.transition("postTurn");
                },

                no : function() {
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
                    var context = this;
                    var buttons = [ {
                        text: "Trade",
                        onClick: function() {
                            context.handle("trade");
                        }
                    }, 
                    {
                        text: "Buy Houses",
                        onClick: function() {
                            context.handle("buy_houses");
                        }
                    },
                    {
                        text: "Continue",
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
                    this.transition("endedTurn");
                }
            },

            proposeTrade: {
                _onEnter : function() {
                    this.game.createTrade();
                    this.game.message = "Click the items you want to trade. Choose 1 person and items. Then click continue.";
                    var context = this;
                    var buttons = [ {
                        text: "Continue",
                        onClick: function() {
                            context.handle("offer_trade");
                        }
                    }, 
                    {
                        text: "Cancel",
                        onClick: function() {
                            context.handle("cancel");
                        }
                    },
                    ];

                    this.game.sendMessage(buttons, "set buttons");
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
                    this.game.message = "Trade cancelled. ";
                    this.transition("postTurn");
                }
            },

            tradeAnswer: {
                _onEnter : function() {
                    this.game.message = this.game.trade.answeringPlayer.name + ", do you want to trade with " + this.game.trade.proposingPlayer.name + "?" + "\nThey are " + this.game.trade.itemsToString();
                
                    var context = this;
                    var buttons = [ {
                        text: "Yes",
                        onClick: function() {
                            context.handle("yes");
                        }
                    }, 
                    {
                        text: "No",
                        onClick: function() {
                            context.handle("No");
                        }
                    },
                    ];

                    this.game.sendMessage(buttons, "set buttons");
                },

                yes : function() {
                    this.game.trade.completeTrade();
                    this.game.message = "You traded. ";
                    this.game.clearTrade();
                    this.transition("postTurn");
                },

                no : function() {
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