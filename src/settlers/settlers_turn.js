var Turn = require("../turn");
var inherits = require('util').inherits;

function SettlersTurn(game) {
    // this.game = game;

    this.turnMap = new Turn({
        initialize: function( options ) {
            console.log("tests");
        },

        game : game,
        buttons: [],

        initialState: "placingInitialSettlements",

        namespace: "test",

        states: {
            uninitialized: {
                start : function() {
                    this.transition("placingInitialSettlements");
                }
            },

            placingInitialSettlements: {
                _onEnter: function() {
                    this.game.message = this.game.getCurrentPlayer().name + " select a location to build your settlement";
                    this.buttons = [];
                },

                yes : function() {
                    this.transition("placingInitialRoad");
                }
            },

            placingInitialRoad: {
                _onEnter: function() {
                    game.message = this.game.getCurrentPlayer().name + " select an adjacent vertex to build your road";
                    this.buttons = [];
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
                    this.buttons = ["Roll"];
                },

                Roll : function() {
                    this.transition("rolled");
                }
            },

            rolled: {
                _onEnter : function() {
                    var actions = this.game.rollAndGiveCards();
                    // this.game.message = actions[0];
                    this.buttons = [];
                    this.transition("postTurn");
                }
            },

            build: {
                _onEnter : function() {
                    this.game.message = "Select what you want to build/buy";
                    this.buttons = ["Road", "Settlement", "City", "DevelopmentCard"];
                },

                Road: function() {
                    this.transition("buildRoad");
                },

                Settlement: function() {
                    this.transition("buildSettlement");
                },

                City: function() {
                    this.transition("buildCity");
                },

                DevelopmentCard: function() {
                    this.transition("buyDevelopmentCard");
                },
            },

            buildRoad: {
                _onEnter : function() {
                    this.game.message = "Select two verticies to build your road";
                    this.buttons = [];
                },
            },

            buildSettlement: {
                _onEnter : function() {
                    this.game.message = "Select a location to build your settlement";
                    this.buttons = [];
                },
            },

            buildCity: {
                _onEnter : function() {
                    this.game.message = "Select a current settlement to upgrade to a city";
                    this.buttons = [];
                },
            },

            buyDevelopmentCard: {
                _onEnter: function() {
                    this.game.message = "You bought a development card";
                    this.buttons = [];
                },
            },

            postTurn: {
                _onEnter : function() {
                    this.game.message = "Choose an option (trade, build), or click continue to end your turn";
                    this.buttons = ["EndTurn", "Trade", "Build"];
                },

                EndTurn: function() {
                    this.transition("endedTurn");
                },

                Trade: function() {
                    this.transition("trade");
                },

                Build: function() {
                    this.transition("build");
                }
            },

            endedTurn: {
                _onEnter : function() {
                    this.game.nextPlayer();
                    this.buttons = [];
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
