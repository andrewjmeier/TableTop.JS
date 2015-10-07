
function Player(name) {
    this.name = name;
    this.money = 500;
    this.properties = [];
    this.position = 0;
    this.getOutOfJailFreeCards = 0;
    this.inJail = false;
    this.turnsInJail = 0;
};

Player.prototype.payBail = function() {
    this.releaseFromJail();
    this.money -= 50;
};

Player.prototype.getOutOfJailFree = function() {
    this.releaseFromJail();
    this.getOutOfJailFreeCards -= 1;
};

Player.prototype.releaseFromJail = function() {
    this.inJail = false;
    this.turnsInJail = 0;
};

Player.prototype.makePayment = function(amount) {
    this.money -= amount;
};

Player.prototype.makeDeposit = function(amount) {
    this.money += amount;
};

Player.prototype.moveTo = function(position) {
    this.position = position;
};

Player.prototype.move = function(spacesToMove) {
    this.position += spacesToMove;
};

module.exports = Player;