var Player = require("./player.js");
var Card = require("./card.js");
var Game = require("./game.js");
var Utils = require("./utils.js");
var Board = require("./board_utils.js");

var john = new Player("John");

var steve = new Player("Steve");

var sam = new Player("Sam");

var mike = new Player("Mike");

var jimmy = new Player("Jimmy");

var players = [john, steve, sam, mike, jimmy];

var communityChestDeck = Utils.buildCommunityChestDeck();

var chanceDeck = Utils.buildChanceDeck();

var board = new Board();

var monopoly = new Game(players, chanceDeck, communityChestDeck, board);

n = 0;
while (n < 100) {
    console.log(monopoly.players[monopoly.currentPlayer]);
	monopoly.movePlayer();
	console.log(monopoly.dice);
    console.log(monopoly.players[monopoly.currentPlayer]);
	monopoly.nextPlayer();
	n += 1;
    console.log("\n\n");
}
