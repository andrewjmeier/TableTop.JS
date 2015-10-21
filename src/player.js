function Player(name, number) {
  this.name = name;
  this.position = 0;
  this.color = number;
};

Player.prototype.moveTo = function(position) {
  this.position = position;
};

module.exports = Player;
