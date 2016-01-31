var TableTop = require("../../tabletop/tabletop.js");
var inherits = require('util').inherits;

function CheckerView(game, turnMap) {
  TableTop.View.call(this, game, turnMap);
}

inherits(CheckerView, TableTop.View);

CheckerView.prototype.drawTile = function(tile, size) {

    var tileView = new PIXI.Graphics();
    tileView.lineStyle(1, 0, 1); 
    tileView.beginFill(tile.color, 1); 
    tileView.drawRect(0, 0, size.width, size.height);
    return tileView;

};

CheckerView.prototype.drawToken = function(token, size) {

    var tokenView = new PIXI.Graphics();
    tokenView.lineStyle(1, 0, 1);
    tokenView.beginFill(token.color, 1);
    tokenView.drawCircle(size.width/2, size.height/2, size.width/2 - 20);
    return tokenView;

};

module.exports = CheckerView;
