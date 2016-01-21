var c = require("./ttConstants.js");

function GameOverView(game) {
  this.game = game;
};

GameOverView.prototype.drawView = function() {
  this.setupPage();
};

GameOverView.prototype.setupPage = function() {
  document.getElementById('div1').innerHTML = this.getHTMLText();
  var context = this;
  document.getElementById('btnReset').onclick=function(){context.handleButtonClick()};
};


GameOverView.prototype.getHTMLText= function() {

  var htmlText = ' <form id="form1">'+
    this.game.getCurrentPlayer().name + ' has won!\
    <input type="button" id="btnReset" value="Reset">\
    </form> ';

  return htmlText;

};
GameOverView.prototype.handleButtonClick = function() {
  //transition to new game
  this.game.updateState("reset");
};

GameOverView.prototype.removeView = function() {
  document.getElementById('div1').innerHTML = '';
};

GameOverView.prototype.drawMessage = function() {
};


module.exports = GameOverView;