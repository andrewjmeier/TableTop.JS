var c = require("./ttConstants.js");
var Player = require("./player.js");

function StartView(game) {
  this.game = game;
};

StartView.prototype.drawStartView = function() {
  this.setupPage(this.game.defaultNumPlayers);
};

StartView.prototype.setupPage = function(beginningNumPlayers) {
  document.getElementById('div1').innerHTML = this.getHTMLText(beginningNumPlayers);
  var context = this;
  document.getElementById('btnEnter').onclick=function(){context.handleButtonClick()};
  document.getElementById('numPlayersInput').onchange=function(){context.handleNumChanged()};

};


StartView.prototype.getHTMLText= function(beginningNumPlayers) {

  var htmlText = ' <form id="form1">\
    Enter the number of players\
    <select id="numPlayersInput">';

  for(var i = 0; i < this.game.possibleNumPlayers.length; i++){
    htmlText = htmlText + '<option value="' + this.game.possibleNumPlayers[i] +  '"';
    if(this.game.possibleNumPlayers[i] == beginningNumPlayers){
      htmlText = htmlText + ' selected';
    } 
    htmlText = htmlText +  '>' +this.game.possibleNumPlayers[i] + '</option>';
  }
  htmlText = htmlText + '</select><br>';

  var numPlayers;
  if(!document.getElementById('numPlayersInput')){
    numPlayers = beginningNumPlayers;
  } else {
    numPlayers = document.getElementById('numPlayersInput').value;
  }
  for(var i = 0; i < numPlayers; i++){
    htmlText = htmlText + 'Player ' + (i+1) + ' Name: \
    <input type="text" id="player' + (i+1) + 'Name"><br>';
  }
    //adding enter button
  htmlText = htmlText + '<input type="button" id="btnEnter" value="Enter">\
    </form> ';

  return htmlText;

};

StartView.prototype.handleNumChanged = function() {
  this.setupPage(document.getElementById('numPlayersInput').value);
};

//this creates players
StartView.prototype.handleButtonClick = function() {
  //transition to view
  var players = [];
  var numPlayers;
  if(!document.getElementById('numPlayersInput')){
    numPlayers = this.game.defaultNumPlayers;
  } else {
    numPlayers = document.getElementById('numPlayersInput').value;
  }
  for(var i = 0; i < numPlayers; i++){
    var playerName;
    if(!document.getElementById('player' + (i+1) + 'Name')){
      playerName = "Player " + (i+1);
    } else {
      playerName = document.getElementById('player' + (i+1) + 'Name').value;
    }
    players[i] = new Player(playerName, i+1);
  }

  this.game.setPlayers(players);

  // this.removeStartView();
  this.game.updateState("play");
};

StartView.prototype.removeStartView = function() {
  document.getElementById('div1').innerHTML = '';
};

StartView.prototype.drawMessage = function() {
};


module.exports = StartView;