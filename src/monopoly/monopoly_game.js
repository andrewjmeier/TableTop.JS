var ChanceDeck = require("./cards/chanceDeck");
var CommunityChestDeck = require("./cards/communityChestDeck");
var inherits = require('util').inherits;
var Trade = require("./monopoly_trade.js");
var TableTop = require('../../tabletop/tabletop');
var Player = require('./monopoly_player.js');
var _ = require('lodash');
var $ = require("jquery");

function MonopolyGame(board) {
  TableTop.Game.call(this, board);
  this.propagate(this.board);
  this.chanceCards = new ChanceDeck();
  this.communityChestCards = new CommunityChestDeck();
  this.shuffleCards();
  this.doublesCount = 0;
  this.message = "";
  this.activeCard = null;
  this.trade = null;
  this.hasMadeGame = false;
};

inherits(MonopolyGame, TableTop.Game);

MonopolyGame.prototype.createPlayer = function(name) {
  var player = new Player(name, 0, 0); // TODO: remove this number field?
  this.propagate(player);
  // var token = player.tokens[0];
  // var tile = this.board.tiles[0];
  // tile.tokens.push(token);
  // this.board.tiles[0].tokens.push(player.tokens[0]);
  return player;
};

MonopolyGame.prototype.updateToStartState = function() {
  this.updateState("continue");
};

MonopolyGame.prototype.getJSONString = function() {

  var playersArray = [];
  for (var i = 0; i < this.players.length; i++) {
    var playerText = this.players[i].getJSONString();
    playersArray.push(playerText);
  }

  return {
    players: playersArray,
    currentPlayer: this.currentPlayer,
    board: this.board.getJSONString(),
    gameID: this.gameID
  }

};

MonopolyGame.prototype.createFromJSONString = function(data) {
  var dic = JSON.parse(data);

  // only update if it's this game
  if (this.gameID !== dic.gameID) {
    return;
  }

  this.currentPlayer = dic.currentPlayer;
  
  for (var i = 0; i < dic.players.length; i++) {
    var player = new Player();
    this.propagate(player);
    player.createFromJSONString(dic.players[i]);
    this.players[i] = player;
  }
  this.board.createFromJSONString(dic.board);

  this.sendMessage("refreshView", "view");

};

MonopolyGame.prototype.setPlayers = function(players) { 
  this.players = players;
  for (var i = players.length - 1; i >= 0; i--) {
    this.board.buildTokenForTile(players[i].tokens[0], this.board.tiles[0]);
  };
};

MonopolyGame.prototype.shuffleCards = function() {
  this.chanceCards.shuffle();
  this.communityChestCards.shuffle();
};

MonopolyGame.prototype.drawChanceCard = function() {
  var card = this.chanceCards.drawCard(true);
  this.sendMessage(card.text);
  this.sendMessage(card.text, "show chance");
  this.activeCard = card;
  return card.action(this);
};

MonopolyGame.prototype.drawCommunityChestCard = function() {
  var card = this.communityChestCards.drawCard(true);
  this.sendMessage(card.text);
  this.sendMessage(card.text, "show community chest");
  this.activeCard = card;
  return card.action(this);
};

MonopolyGame.prototype.getOwnerForProperty = function(p) {
  return _.find(this.players, function(player) {
    var property = _.find(player.properties, function(prop) {
      return (prop.name == p.name);
    });
    return (undefined != property);
  });
};

MonopolyGame.prototype.sendToJail = function(player) {
  player.inJail = true;
  player.turnsInJail = 0;
  return this.moveTo(10, player, false);
};

MonopolyGame.prototype.rollAndMovePlayer = function() {
  this.rollDice(2);
  var player = this.getCurrentPlayer();
  // if we're not in jail, just move
  if (!player.inJail)
    return this.movePlayer(player);

  // otherwise increment turnsInJail, then handle
  // various circumstances surrounding getting out of
  // jail or staying in
  player.turnsInJail += 1;
  if (this.isDoubles(this.dice)) {
    player.releaseFromJail();
  } else if (player.turnsInJail === 3) {
    player.payBail();
  } else {
    return POST_TURN;
  }

  return this.movePlayer(player);
};

MonopolyGame.prototype.movePlayer = function(player) {
  var spacesToMove = 0;

  for (var index in this.dice) {
    spacesToMove += this.dice[index];
  }

  return this.move(spacesToMove, player);
};

MonopolyGame.prototype.move = function(amount, player, canPassGo) {
  var token = player.getToken();
  var oldIndex = this.board.getTileIndexForToken(token);
  var newIndex = (oldIndex + amount) % 40;

  return this.moveTo(newIndex, player, canPassGo);
};

MonopolyGame.prototype.moveTo = function(tileIndex, player, canPassGo) {
  if (undefined == canPassGo) {
    canPassGo = true;
  }

  var token = player.getToken();

  var oldTile = this.board.findTileForToken(token);
  var oldIndex = this.board.tiles.indexOf(oldTile);

  if (oldIndex > tileIndex && canPassGo) {
    player.makeDeposit(200);
  }

  var tile = this.board.getTile(tileIndex);

  this.board.moveTokenToTile(token, tile);

  this.sendMessage(token, "play sound");

  return this.board.getTile(tileIndex).performLandingAction(this);
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
};

MonopolyGame.prototype.clearTrade = function() {
  this.trade = null;
};
MonopolyGame.prototype.createTrade = function() {
  this.trade = new Trade(this.getCurrentPlayer());
};

MonopolyGame.prototype.addPropertyToTrade = function(property) {
  if (this.getCurrentState() == PROPOSE_TRADE) {
    var owner = this.getOwnerForProperty(property);
    this.trade.addOrRemoveProperty(property, owner);
    this.sendMessage("Removed " + property.name + " from the trade");    
    console.log(this.trade);
  }
};

MonopolyGame.prototype.addPlayerToTrade = function(player) {
  if (this.getCurrentState() == PROPOSE_TRADE && !this.trade.answeringPlayer){
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