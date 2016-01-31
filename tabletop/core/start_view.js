var c = require("./ttConstants.js");
var Player = require("./player.js");
var Component = require("./component");
var inherits = require('util').inherits;

/**
 * The StartView class
 * @constructor
 * @param {Game} game - the game state
 * @extends {Component}
*/
function StartView(game) {
  Component.call(this);
  this.game = game;
};
inherits(StartView, Component);

/**
 * draws the game view
 * @returns {void}
*/
StartView.prototype.drawView = function() {
  this.setupPage(this.game.possibleNumPlayers[0]);
};

/**
 * sets up the pageto take in the provided HTML text string 
 * also sets up the onclick for the button 
 * and the onchnage for the drop down selector
 * @returns {void}
*/
StartView.prototype.setupPage = function(beginningNumPlayers) {
  document.getElementById('div1').innerHTML = this.getHTMLText(beginningNumPlayers);
  var context = this;
  document.getElementById('btnEnter').onclick=function(){context.handleButtonClick()};
  document.getElementById('numPlayersInput').onchange=function(){context.handleNumChanged()};

};

/**
 * provides the htmlText to be place in a div on the page
 * @returns {string} htmlText
*/
StartView.prototype.getHTMLText= function(beginningNumPlayers) {

  var htmlText = ' <form id="form1">\
    Enter the number of players:  ' + 
    this.createDropDown("numPlayersInput", this.game.possibleNumPlayers, beginningNumPlayers) + 
    '<br>';

  for(var i = 0; i < this.getNumPlayers(beginningNumPlayers); i++){
    htmlText = htmlText + 'Player ' + (i+1) + ' Name: \
    <input type="text" id="player' + (i+1) + 'Name"><br>';
  }
  //adding enter button
  htmlText = htmlText + '<input type="button" id="btnEnter" value="Enter">\
    </form> ';
  return htmlText;
};

/**
 * puts together the html text for a dropdown list of the possible number
 * of players into a string
 * @returns {string} dropDownHtml
*/
StartView.prototype.createDropDown = function(id, array, selected) {
  var dropDownHTML = '<select id="' + id + '">';

  for(var i = 0; i < array.length; i++){
    dropDownHTML = dropDownHTML + '<option value="' + array[i] +  '"';
    if(array[i] == selected){
      dropDownHTML = dropDownHTML + ' selected';
    } 
    dropDownHTML = dropDownHTML +  '>' +array[i] + '</option>';
  }
  dropDownHTML = dropDownHTML + '</select>';

  return dropDownHTML;
};

/**
 * finds out the number of players that should currently be displayed 
 * as selected in the dropdown list
 * @returns {int} numPlayers
*/
StartView.prototype.getNumPlayers = function(beginningNumPlayers) {
  if(!document.getElementById('numPlayersInput')){
    return beginningNumPlayers;
  }
  return document.getElementById('numPlayersInput').value;
};


/**
 * Handles the dropdown list value changed by re-setting up the page
 * @returns {void}
*/
StartView.prototype.handleNumChanged = function() {
  this.setupPage(document.getElementById('numPlayersInput').value);
};

/**
 * Handles the onclick for the button by creating players and transition state
 * @returns {void}
*/
StartView.prototype.handleButtonClick = function() {
  var players = [];
  var numPlayers;
  if(!document.getElementById('numPlayersInput')){
    numPlayers = this.game.possibleNumPlayers[0];
  } else {
    numPlayers = document.getElementById('numPlayersInput').value;
  }
  for(var i = 0; i < numPlayers; i++){
    var playerName;
    if(!document.getElementById('player' + (i+1) + 'Name') || document.getElementById('player' + (i+1) + 'Name').value == ""){
      playerName = "Player " + (i+1);
    } else {
      playerName = document.getElementById('player' + (i+1) + 'Name').value;
    }
    players[i] = new Player(playerName, this.game.playerColors[i]);
  }

  this.game.setPlayers(players);
  this.game.updateState("play");
};

/**
 * removes the game over view
 * @returns {void}
*/
StartView.prototype.removeView = function() {
  document.getElementById('div1').innerHTML = '';
};

StartView.prototype.drawMessage = function() {
};


module.exports = StartView;