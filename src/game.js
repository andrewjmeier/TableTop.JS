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
  this.state = 0;
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
  var actions = card.action(this);
  return [card.text.concat(actions[0]), actions[1]];
};

Game.prototype.drawCommunityChestCard = function() {
  var card = this.communityChestCards.drawCard();
  console.log("community chest card drawn ", card);
  var actions = card.action(this);
  return [card.text.concat(actions[0]), actions[1]];
};

Game.prototype.rollAndMovePlayer = function() {
  this.rollDice(2);
  return this.movePlayer();
};

Game.prototype.movePlayer = function() {
  
  // if we're not in jail, just move 
  if (!this.getCurrentPlayer().inJail) 
    return this.move();

  // otherwise increment turnsInJail, then handle 
  // various circumstances surrounding getting out of 
  // jail or staying in
  this.getCurrentPlayer().turnsInJail += 1;
  if (this.isDoubles(this.dice)) {
    this.getCurrentPlayer().releaseFromJail();
  } else if (this.getCurrentPlayer().turnsInJail === 3) {
    this.getCurrentPlayer().payBail();
  } else {
    return [this.getCurrentPlayer().name + " is serving a turn in jail. ", POST_TURN_ANSWER];
  }
  
  return this.move();
};

Game.prototype.move = function() {
  var spacesToMove = 0;
  for (var index in this.dice) {
    spacesToMove += this.dice[index];
  }
  this.getCurrentPlayer().move(spacesToMove);
  var player = this.getCurrentPlayer();
  var actions = this.board.spaces[player.position].performLandingAction(this);
  actions[0] = ("You rolled a " + spacesToMove + ". ").concat(actions[0]);
  return actions;
};

Game.prototype.isDoubles = function(dice) {
  return dice[0] === dice[1];
};

Game.prototype.setState = function(newState) {
  this.state = newState;
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
