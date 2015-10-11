function Player(name) {
    this.name = name;
    this.money = 500;
    this.properties = [];
    this.position = 0;
    this.getOutOfJailFreeCards = 0;
    this.inJail = false;
    this.turnsInJail = 0;
};

Player.prototype.sendToJail = function() {
    this.moveTo(10);
    this.inJail = true;
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

Player.prototype.payPlayers = function(amount, players) {
    for (index in players) {
        if (players[i] !== this) {
            this.payPlayer(amount, players[index]);
        }
    }
};

Player.prototype.collectFromPlayers = function(amount, players) {
    for (index in players) {
        if (players[i] !== this) {
            players[index].payPlayer(amount, this);
        }
    }
};

Player.prototype.payPlayer = function(amount, player) {
    player.makeDeposit(amount);
    this.makePayment(amount);
};

Player.prototype.makePayment = function(amount) {
    this.money -= amount;
};

Player.prototype.makeDeposit = function(amount) {
    this.money += amount;
};

Player.prototype.moveTo = function(position) {
    var previousPosition = this.position;

    // passed go collecting $200
    if (previousPosition > position) {
        this.money += 200;
    }
    this.position = position;
};

Player.prototype.move = function(spacesToMove) {
    nextPosition = this.position + spacesToMove;

    // passed go
    if (nextPosition >= 40) {
        nextPosition = nextPosition % 40;
        this.money += 200;
    }
    this.position = nextPosition;
};

module.exports = Player;
