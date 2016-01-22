var c = require("./ttConstants.js");

function NextPlayerView(game) {
  this.game = game;
};

NextPlayerView.prototype.drawView = function() {
  this.setupPage();
};

NextPlayerView.prototype.setupPage = function() {
  document.getElementById('div1').innerHTML = this.getHTMLText();
  var context = this;
  document.getElementById('btnContinue').onclick=function(){context.handleButtonClick()};
};


NextPlayerView.prototype.getHTMLText= function() {

  var htmlText = ' <form id="form1">\
  Please pass ' + this.game.getCurrentPlayer().name + ' the computer. It is their turn.<br>\
    <input type="button" id="btnContinue" value="Continue">\
    </form> ';

  return htmlText;

};
NextPlayerView.prototype.handleButtonClick = function() {
  //transition to turn itself
  this.game.updateState("goToTurn");
};

NextPlayerView.prototype.removeView = function() {
  document.getElementById('div1').innerHTML = '';
};

NextPlayerView.prototype.drawMessage = function() {
};


module.exports = NextPlayerView;