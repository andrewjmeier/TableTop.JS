var TableTop = require('../../../tabletop/tabletop');

function MonopolyTableView(game, turnMap) {
  TableTop.TableView.call(this, game, turnMap);
  this.subscribeMessageModule();
};

inherits(MonopolyTableView, TableTop.TableView);

module.exports = MonopolyTableView;