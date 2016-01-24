var c = require("./ttConstants.js");
var Component = require("./component");
var inherits = require('util').inherits;

/**
 * The GameOverView class
 * @constructor
 * @param {Game} game - the game state
 * @extends {Component}
*/
function GameOverView(game) {
  Component.call(this);
  this.game = game;
};
inherits(GameOverView, Component);

/**
 * draws the game over view
 * @returns {void}
*/
GameOverView.prototype.drawView = function() {
  this.setupPage();
};

/**
 * sets up the pageto take in the provided HTML text string
 * @returns {void}
*/
GameOverView.prototype.setupPage = function() {
  document.getElementById('div1').innerHTML = this.getHTMLText();
  var context = this;
};

/**
 * provides the htmlText to be place in a div on the page
 * @returns {string} htmlText
*/
GameOverView.prototype.getHTMLText= function() {
  var htmlText = ' <form id="form1">'+
    this.game.getCurrentPlayer().name + ' has won!\
    </form> ';

  return htmlText;

};

/**
 * removes the game over view
 * @returns {void}
*/
GameOverView.prototype.removeView = function() {
  document.getElementById('div1').innerHTML = '';
};

GameOverView.prototype.drawMessage = function() {
};


module.exports = GameOverView;