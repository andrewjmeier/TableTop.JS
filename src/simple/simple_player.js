var inherits = require('util').inherits;
var Player = require("../player.js");

function SimplePlayer(name, number) {
  Player.call(this, name, number);
};

inherits(SimplePlayer, Player);

SimplePlayer.prototype.move = function(spacesToMove, goal) {
  if (this.position + spacesToMove <= goal) {
    this.position = this.position + spacesToMove;
  }
};

module.exports = SimplePlayer;
