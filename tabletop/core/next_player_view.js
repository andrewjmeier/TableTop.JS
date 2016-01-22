var c = require("./ttConstants.js");
var Component = require("./component");
var inherits = require('util').inherits;

/**
 * The NextPlayerView class
 * @constructor
 * @param {Game} game - the game state
 * @extends {Component}
*/
function NextPlayerView(game) {
  Component.call(this);
  this.game = game;
};
inherits(NextPlayerView, Component);

/**
 * draws the next player view
 * @returns {void}
*/
NextPlayerView.prototype.drawView = function() {
  this.setupPage();
};

/**
 * sets up the pageto take in the provided HTML text string 
 * also sets up the onclick for the button
 * @returns {void}
*/
NextPlayerView.prototype.setupPage = function() {
  document.getElementById('div1').innerHTML = this.getHTMLText();
  var context = this;
  document.getElementById('btnContinue').onclick=function(){context.handleButtonClick()};
};

/**
 * provides the htmlText to be place in a div on the page
 * @returns {string} htmlText
*/
NextPlayerView.prototype.getHTMLText= function() {
  var htmlText = ' <form id="form1">\
  Please pass to ' + this.game.getCurrentPlayer().name + '. It is their turn.<br>\
    <input type="button" id="btnContinue" value="Continue">\
    </form> ';
  return htmlText;
};

/**
 * Handles the onclick for the button by transition state
 * @returns {void}
*/
NextPlayerView.prototype.handleButtonClick = function() {
  //transition to turn itself
  this.game.updateState("goToTurn");
};

/**
 * removes the game over view
 * @returns {void}
*/
NextPlayerView.prototype.removeView = function() {
  document.getElementById('div1').innerHTML = '';
};

NextPlayerView.prototype.drawMessage = function() {
};


module.exports = NextPlayerView;