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

MonopolyTurn.prototype.updateState = function(click) {
    this.turnMap.handle(click);
};

MonopolyTurn.prototype.getCurrentState = function() {
    return this.turnMap.compositeState();
};

module.exports = MonopolyTurn;
