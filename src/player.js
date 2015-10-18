function Player(name, number) {
  number = number ? number : 0
  this.name = name;
  this.money = 500;
  this.properties = [];
  this.position = 0;
  this.getOutOfJailFreeCards = 0;
  this.inJail = false;
  this.turnsInJail = 0;
  var colors = [0x6F3A19,
                0x88C8F3,
                0xC90071,
                0xE68900,
                0xD20019,
                0xE6E60F,
                0x0AA345,
                0x2D4A9B]
  this.playerColor = colors[number];
};

Player.prototype.sendToJail = function() {
  this.position = 10;
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
  for (var index in players) {
    if (players[index] !== this) {
      this.payPlayer(amount, players[index]);
    }
  }
};

Player.prototype.collectFromPlayers = function(amount, players) {
  for (var index in players) {
    if (players[index] !== this) {
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
  var nextPosition = this.position + spacesToMove;

  // passed go
  if (nextPosition >= 40) {
    nextPosition = nextPosition % 40;
    this.money += 200;
  }
  this.position = nextPosition;
};


Player.prototype.canBuy = function(property) { 
  return (this.money > property.cost) && !property.owner;
};

Player.prototype.owesRent = function(property) { 
  return property.owner && !this.owns(property);
};

Player.prototype.owns = function(property) { 
  return property.owner === this;
};

Player.prototype.buy = function(property) { 
  this.makePayment(property.cost);
  this.properties.push(property);
  property.owner = this;
};

Player.prototype.assets = function() { 

  var assets = this.money;
  for (var property in this.properties) { 
    assets += property.cost;
    if (property.numHouses) 
      assets += property.numHouses*property.houseCost;
  } 
  
  return assets;
};



module.exports = Player;
