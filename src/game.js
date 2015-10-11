var Utils = require("./utils.js");

function Game(players, chance, communityChest, board) {
    this.players = players,
    this.currentPlayer = 0;
    this.board = board;
    this.dice = [];
    this.chanceCards = chance;
    this.communityChestCards = communityChest;
    this.doublesCount = 0;
    this.randomizeCurrentPlayer();

    Utils.shuffle(this.chanceCards);
    Utils.shuffle(this.communityChestCards);
};

Game.prototype.randomizeCurrentPlayer = function() {
    this.currentPlayer = Math.floor(Math.random() * this.players.length);
};

Game.prototype.rollDice = function(numberOfDice, sides) {
    if (!sides) {
        sides = 6;
    }
    this.dice = [];
    for (i = 0; i < numberOfDice; i++) {
        roll = Math.floor(Math.random() * sides) + 1;
        this.dice.push(roll);
    }
};

Game.prototype.movePlayer = function() {
    this.rollDice(2);
    if (this.getCurrentPlayer().inJail) {
        this.getCurrentPlayer().turnsInJail += 1;
        if (this.isDoubles(this.dice)) {
            this.getCurrentPlayer().releaseFromJail();
            this.move();
        } else if (this.getCurrentPlayer().turnsInJail === 3) {
            this.getCurrentPlayer().payBail();
            this.move();
        }
    } else {
        this.move();
    }
};

Game.prototype.move = function() {
    var spacesToMove = 0;
    for (index in this.dice) {
        spacesToMove += this.dice[index];
    }
    this.getCurrentPlayer().move(spacesToMove);
    var player = this.getCurrentPlayer();
    this.board.spaces[player.position].performLandingAction(player);
};

Game.prototype.isDoubles = function(dice) {
    return dice[0] === dice[1];
};

Game.prototype.getCurrentPlayer = function() {
    return this.players[this.currentPlayer];
}

Game.prototype.nextPlayer = function() {
    if (!this.isDoubles(this.dice)) {
        this.doublesCount = 0;
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    } else {
        this.doublesCount += 1;
        if (this.doublesCount === 3) {
            this.doublesCount = 0;
            this.getCurrentPlayer().inJail = true;
            this.getCurrentPlayer().position = 10;
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        }
    }
};


module.exports = Game;