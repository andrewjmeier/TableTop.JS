var inherits = require('util').inherits;

var TableTop = require('../../tabletop/tabletop');

function MonopolyToken(cssClass) {
    TableTop.Token.call(this);
    this.cssClass = cssClass;
}

inherits(MonopolyToken, TableTop.Token);

MonopolyToken.prototype.getJSONString = function() {
  var others = TableTop.Token.prototype.getJSONString.call(this);
  others.cssClass = this.cssClass;
  others.type = "MonopolyToken";
  return others;

};

MonopolyToken.prototype.createFromJSONString = function(data) {
  TableTop.Token.prototype.createFromJSONString.call(this, data);
  console.log("just called super", this);
  this.cssClass = data.cssClass;
};


module.exports = MonopolyToken;