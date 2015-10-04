var Player = {
    name: "",
    money: 500,
    properties: [],
    position: 0,
    getOutOfJailFreeCards: 0,
    inJail: false,
    turnsInJail: 0,

    payBail: function() {
        this.releaseFromJail();
        this.money -= 50;
    },

    getOutOfJailFree: function() {
        this.releaseFromJail();
        this.getOutOfJailFreeCards -= 1;
    },

    releaseFromJail: function() {
        this.inJail = false;
        this.turnsInJail = 0;
    },

    makePayment: function(amount) {
        // TODO - introduce handleing for if they don't have enough money
        this.money -= amount;
    },

    makeDeposit: function(amount) {
        this.money += amount;
    },

    moveTo: function(position) {
        this.position = position;
    },

    move: function(spacesToMove) {
        this.position += spacesToMove;
    },

};

module.exports = Player;