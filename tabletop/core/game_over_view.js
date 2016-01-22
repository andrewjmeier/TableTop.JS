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
};


GameOverView.prototype.getHTMLText= function() {
  var htmlText = ' <form id="form1">'+
    this.game.getCurrentPlayer().name + ' has won!\
    </form> ';

  return htmlText;

};

GameOverView.prototype.removeView = function() {
  document.getElementById('div1').innerHTML = '';
};

GameOverView.prototype.drawMessage = function() {
};


module.exports = GameOverView;