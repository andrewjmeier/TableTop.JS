var Player = {
    name: "",
    money: 500,
    properties: [],
    position: 0,
    hasGetOutFreeCard: false,
    inJail: false,
    turnsInJail: 0,

    payBail: function() {
        this.releaseFromJail();
        this.money -= 50;
    },

    getOutOfJailFree: function() {
        this.releaseFromJail();
        this.hasGetOutFreeCard = false;
    },

    releaseFromJail: function() {
        this.inJail = false;
        this.turnsInJail = 0;
    },

};

module.exports = Player;