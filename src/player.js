function Player(name, number) {
  this.name = name;
  // TODO - this should be refactored to be an array of tokens for the player
  this.position = 0;
  this.color = number;
};

Player.prototype.moveTo = function(position) {
  this.position = position;
};

module.exports = Player;
