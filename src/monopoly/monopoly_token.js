var inherits = require('util').inherits;

var TableTop = require('../../tabletop/tabletop');

function MonopolyToken(cssClass) {
    TableTop.Token.call(this);
    this.cssClass = cssClass;
}

inherits(MonopolyToken, TableTop.Token);

module.exports = MonopolyToken;