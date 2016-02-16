var inherits = require('util').inherits;

var TableTop = require('../../tabletop/tabletop');

function MonopolyToken(cssClass) {
    TableTop.Token.call(this);
    this.cssClass = cssClass;
}

inherits(MonopolyToken, TableTop.Token);

MonopolyToken.prototype.getJSONString = function() {
  var others = MonopolyToken.super_.prototype.getJSONString()
  others.cssClass = this.cssClass;
  others.type = "MonopolyToken";
  return others;

};

MonopolyToken.prototype.createFromJSONString = function(data) {
  MonopolyToken.super_.prototype.createFromJSONString(data);
  this.cssClass = data.cssClass;
};


module.exports = MonopolyToken;