var Player = require("./player.js");
var Card = require("./card.js");
var Game = require("./game.js");
var Utils = require("./utils.js");
var Board = require("./board_utils.js");

var john = Object.create(Player);
john.name = "John";

var steve = Object.create(Player);
steve.name = "Steve";

var sam = Object.create(Player);
sam.name = "Sam";

var players = [john, steve, sam];

var communityChestDeck = Utils.buildCommunityChestDeck();

var chanceDeck = Utils.buildChanceDeck();


var monopoly = Object.create(Game);

monopoly.players = players;
monopoly.chanceCards = chanceDeck;
monopoly.communityChestCards = communityChestDeck;
Utils.shuffle(monopoly.chanceCards);
Utils.shuffle(monopoly.communityChestCards);
monopoly.randomizeCurrentPlayer();

n = 0;
while (n < 100) {
	console.log(monopoly.players[monopoly.currentPlayer]);
	monopoly.movePlayer();
	console.log(monopoly.dice);
	monopoly.nextPlayer();
	n += 1;
}
