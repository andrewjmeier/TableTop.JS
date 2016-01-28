var ChanceDeck = require("./cards/chanceDeck");
var CommunityChestDeck = require("./cards/communityChestDeck");
var inherits = require('util').inherits;
// var Game = require("../../tabletop/core/game.js");
var Trade = require("./monopoly_trade.js");
var TableTop = require('../../tabletop/tabletop');


function MonopolyGame(players, board, turnMap) {
  TableTop.Game.call(this, players, board, turnMap);
  this.turnMap = turnMap;
  this.chanceCards = new ChanceDeck();
  this.communityChestCards = new CommunityChestDeck();
  this.shuffleCards();
  this.doublesCount = 0;
  this.message = "";
  this.activeCard = null;
  this.trade = null;
};

inherits(MonopolyGame, TableTop.Game);

MonopolyGame.prototype.shuffleCards = function() {
  this.chanceCards.shuffle();
  this.communityChestCards.shuffle();
};

MonopolyGame.prototype.drawChanceCard = function() {
  var card = this.chanceCards.drawCard(true);
  this.activeCard = card;
  console.log("chance card drawn ", card);
  var actions = card.action(this);
  return [actions[0], actions[1]];
};

MonopolyGame.prototype.drawCommunityChestCard = function() {
  var card = this.communityChestCards.drawCard(true);
  this.activeCard = card;
  console.log("community chest card drawn ", card);
  var actions = card.action(this);
  return [actions[0], actions[1]];
};

MonopolyGame.prototype.rollAndMovePlayer = function() {
  this.rollDice(2);
  return this.movePlayer();
};

MonopolyGame.prototype.movePlayer = function() {

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
    return [this.getCurrentPlayer().name + " is serving a turn in jail. ", POST_TURN];
  }

  return this.move();
};

MonopolyGame.prototype.move = function() {
  var spacesToMove = 0;
  for (var index in this.dice) {
    spacesToMove += this.dice[index];
  }
  this.getCurrentPlayer().move(spacesToMove);
  var player = this.getCurrentPlayer();
  var actions = this.board.tiles[player.position].performLandingAction(this);
  actions[0] = ("You rolled a " + spacesToMove + ". ").concat(actions[0]);
  return actions;
};

MonopolyGame.prototype.nextPlayer = function() {
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

MonopolyGame.prototype.clearActiveCard = function() {
  this.activeCard = null;
};

MonopolyGame.prototype.cancelTrade = function() {
  this.trade.cancelTrade();
  this.clearTrade();
}

MonopolyGame.prototype.clearTrade = function() {
  this.trade = null;
};
MonopolyGame.prototype.createTrade = function() {
  this.trade = new Trade(this.getCurrentPlayer());
};

MonopolyGame.prototype.addPropertyToTrade = function(property) {
  this.trade.addOrRemoveProperty(property);
};

MonopolyGame.prototype.addPlayerToTrade = function(player) {
  if (!this.trade.answeringPlayer){
    this.trade.answeringPlayer = player;
  }
};

MonopolyGame.prototype.addMoneyToTrade = function(money) {
  this.trade.addOrRemoveMoney(money);
};

MonopolyGame.prototype.updateState = function(click) {
  this.turnMap.updateState(click);
};

MonopolyGame.prototype.getCurrentState = function() {
  return this.turnMap.getCurrentState();
};

module.exports = MonopolyGame;
