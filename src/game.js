var ChanceDeck = require("./cards/chanceDeck");
var CommunityChestDeck = require("./cards/communityChestDeck");

function Game(players, board) {
  this.players = players,
  this.currentPlayer = 0;
  this.board = board;
  this.dice = [];
  this.chanceCards = new ChanceDeck();
  this.communityChestCards = new CommunityChestDeck();
  this.shuffleCards();
  this.doublesCount = 0;
  this.randomizeCurrentPlayer();
};

Game.prototype.shuffleCards = function() {
  this.chanceCards.shuffle();
  this.communityChestCards.shuffle();
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

Game.prototype.drawChanceCard = function() {
  var card = this.chanceCards.drawCard();
  console.log("chance card drawn ", card);
  card.action(this);
};

Game.prototype.drawCommunityChestCard = function() {
  var card = this.communityChestCards.drawCard();
  console.log("community chest card drawn ", card);
  card.action(this);
};

Game.prototype.rollAndMovePlayer = function() {
  this.rollDice(2);
  this.movePlayer();
};

Game.prototype.movePlayer = function() {
  if (this.getCurrentPlayer().inJail) {
    this.getCurrentPlayer().turnsInJail += 1;
    if (this.isDoubles(this.dice)) {
      this.getCurrentPlayer().releaseFromJail();
      this.move();
    } else if (this.getCurrentPlayer().turnsInJail === 3) {
      this.getCurrentPlayer().payBail();
      this.move();
    } else {
      console.log(this.getCurrentPlayer().name + " is serving a turn in jail");
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
    this.board.spaces[player.position].performLandingAction(this);
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