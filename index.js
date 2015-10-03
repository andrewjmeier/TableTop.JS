console.log("hello there")

var Player = {
	name: "",
	money: 500,
	properties: []
};

var john = Object.create(Player);
john.name = "John";

var steve = Object.create(Player);
steve.name = "Steve";

var sam = Object.create(Player);
sam.name = "Sam";

var players = [john, steve, sam];

var Game = {
	players: [],
	currentPlayer: 0,
	board: {},
	dice: [],

	randomizeCurrentPlayer: function() {
		this.currentPlayer = Math.floor(Math.random() * this.players.length);
	},

	rollDice: function(numberOfDice, sides) {
		if (!sides) {
			sides = 6;
		}
		this.dice = [];
		for (i = 0; i < numberOfDice; i++) {
			roll = Math.floor(Math.random() * sides) + 1;
			this.dice.push(roll);
		}
	},

	isDoubles: function(dice) {
		return dice[0] === dice[1];
	},

	nextPlayer: function() {
		if !this.isDoubles(this.dice) {
			this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
		}
	}
};

var monopoly = Object.create(Game);

monopoly.players = players;
monopoly.randomizeCurrentPlayer();
console.log(monopoly.currentPlayer);
console.log(monopoly.rollDice(2));