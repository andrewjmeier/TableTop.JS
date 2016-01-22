var c = require("./ttConstants.js");
var Player = require("./player.js");

function StartView(game) {
  this.game = game;
};

StartView.prototype.drawView = function() {
  this.setupPage(this.game.possibleNumPlayers[0]);
};

StartView.prototype.setupPage = function(beginningNumPlayers) {
  document.getElementById('div1').innerHTML = this.getHTMLText(beginningNumPlayers);
  var context = this;
  document.getElementById('btnEnter').onclick=function(){context.handleButtonClick()};
  document.getElementById('numPlayersInput').onchange=function(){context.handleNumChanged()};

};


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

StartView.prototype.getNumPlayers = function(beginningNumPlayers) {
  if(!document.getElementById('numPlayersInput')){
    return beginningNumPlayers;
  }
  return document.getElementById('numPlayersInput').value;
};


StartView.prototype.handleNumChanged = function() {
  this.setupPage(document.getElementById('numPlayersInput').value);
};


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
    players[i] = new Player(playerName, i+1);
  }

  this.game.setPlayers(players);

  this.game.updateState("play");
};

StartView.prototype.removeView = function() {
  document.getElementById('div1').innerHTML = '';
};

StartView.prototype.drawMessage = function() {
};


module.exports = StartView;