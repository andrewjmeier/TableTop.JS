var Player = require("./player.js");
var Card = require("./cards/card.js");
var Game = require("./game.js");
var Utils = require("./utils.js");
var Board = require("./board_utils.js");
var Turn = require("./turn.js");

var john = new Player("John");

var steve = new Player("Steve");

var sam = new Player("Sam");

var mike = new Player("Mike");

var jimmy = new Player("Jimmy");

var players = [john, steve, sam, mike, jimmy];

var board = new Board();

var monopoly = new Game(players, board);

var turn = new Turn();


//setup btns
var yesBtn = document.getElementById('btnYes');
yesBtn.onclick = function() { 
    console.log("yes")
    turn.nextState(true, monopoly);
}
var noBtn = document.getElementById('btnNo');
noBtn.onclick = function() { 
    console.log("no")
    turn.nextState(false, monopoly);
}
//start running game
turn.nextState(false, monopoly);


