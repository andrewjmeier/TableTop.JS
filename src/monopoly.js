require("./board/boardConstants.js");

var Player = require("./player.js");
var Card = require("./cards/card.js");
var Game = require("./game.js");
var Utils = require("./utils.js");
var Board = require("./board_utils.js");
var MonopolyView = require("./view/monopoly_view.js");

var john = new Player("John", 1);

var steve = new Player("Steve", 2);

var sam = new Player("Sam", 3);

var mike = new Player("Mike", 4);

var jimmy = new Player("Jimmy", 5);

var players = [john, steve, sam, mike, jimmy];

var board = new Board();

var monopoly = new Game(players, board);

var view = new MonopolyView(monopoly);
view.drawBoard();


n = 0;

(function myLoop (i) {
   setTimeout(function () {
    console.log(monopoly.players[monopoly.currentPlayer]);
    monopoly.rollAndMovePlayer();
    console.log(monopoly.dice);
    console.log(monopoly.players[monopoly.currentPlayer]);
    monopoly.nextPlayer();
    console.log("\n\n");
    if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
   }, 1000)
})(100);

// while (n < 100) {
//   console.log(monopoly.players[monopoly.currentPlayer]);
// 	monopoly.rollAndMovePlayer();
// 	console.log(monopoly.dice);
//   console.log(monopoly.players[monopoly.currentPlayer]);
// 	monopoly.nextPlayer();
// 	n += 1;
//   console.log("\n\n");
//   var now = new Date().getTime();
//   // while(new Date().getTime() < now + 100){ /* do nothing */ }
// }


