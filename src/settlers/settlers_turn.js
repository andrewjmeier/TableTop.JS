var Turn = require("../turn");
var inherits = require('util').inherits;

function SettlersTurn(game) {
    this.game = game;

    this.turnMap = new Turn({
        initialize: function( options ) {
            console.log("tests");
        },

        game : game,

        initialState: "placingInitialSettlements",

        namespace: "test",

        states: {
            uninitialized: {
                start : function() {
                    this.transition("waitingOnRoll");
                }
            },

            placingInitialSettlements: {
                _onEnter: function() {
                    this.game.message = this.game.getCurrentPlayer().name + " select a location to build your settlement";
                },

                yes : function() {
                    this.transition("placingInitialRoad");
                }
            },

            placingInitialRoad: {
                _onEnter: function() {
                    game.message = this.game.getCurrentPlayer().name + " select an adjacent vertex to build your road";
                },

                yes : function() {
                    this.game.nextPlayer();
                    if (this.game.remainingInitialSettlements < 1) {
                        this.transition("waitingOnRoll");
                    } else {
                        this.transition("placingInitialSettlements");
                    }
                }
            },

            waitingOnRoll: {
                _onEnter: function() {
                    game.message = this.game.players[game.currentPlayer].name + ": Click 'Continue' to roll dice.";
                },

                yes : function() {
                    this.transition("rolled");
                }
            },

            rolled: {
                _onEnter : function() {
                    var actions = this.game.rollAndGiveCards();
                    // this.game.message = actions[0];
                    this.transition("postTurn");
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
                    this.game.nextPlayer();
                    this.transition("waitingOnRoll");
                }
            }
        }
    });
};

SettlersTurn.prototype.updateState = function(click) {
    console.log("updating state", click);
    this.turnMap.handle(click);
};

SettlersTurn.prototype.getCurrentState = function() {
    return this.turnMap.compositeState();
};

module.exports = SettlersTurn;
