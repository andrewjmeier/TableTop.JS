var Game = {
    players: [],
    currentPlayer: 0,
    board: {},
    dice: [],
    chanceCards: [],
    communityChestCards: [],
    doublesCount: 0,

    randomizeCurrentPlayer: function() {
        this.currentPlayer = Math.floor(Math.random() * this.players.length);
    },

    rollDice: function(numberOfDice, sides) {
        if (!sides) {
            sides = 6;
        }
        this.dice = [];
        for (i = 0; i < numberOfDice; i++) {
            roll = Math.floor(Math.random() * sides) + 1;
            this.dice.push(roll);
        }
    },

    movePlayer: function() {
        this.rollDice(2);
        if (this.players[this.currentPlayer].inJail) {
            this.players[this.currentPlayer].turnsInJail += 1;
            if (this.isDoubles(this.dice)) {
                this.players[this.currentPlayer].releaseFromJail();
                this.move();
            } else if (this.players[this.currentPlayer].turnsInJail === 3) {
                this.players[this.currentPlayer].payBail();
                this.move();
            }
        } else {
            this.move();
        }
    },

    move: function() {
        var spacesToMove = 0;
        for (index in this.dice) {
            spacesToMove += this.dice[index];
        }
        nextPosition = this.players[this.currentPlayer].position + spacesToMove;
        if (nextPosition >= 40) {
            nextPosition = nextPosition % 40;
            this.players[this.currentPlayer].money += 200;
        }
        this.players[this.currentPlayer].moveTo(nextPosition);
    },

    isDoubles: function(dice) {
        return dice[0] === dice[1];
    },

    nextPlayer: function() {
        if (!this.isDoubles(this.dice)) {
            this.doublesCount = 0;
            this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        } else {
            this.doublesCount += 1;
            if (this.doublesCount === 3) {
                this.doublesCount = 0;
                this.players[this.currentPlayer].inJail = true;
                this.players[this.currentPlayer].position = 10;
                this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
            }
        }
    }
};

module.exports = Game;