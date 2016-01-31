var $ = require("jquery");

function TableView(game, turnMap) {
    this.game = game;
    this.turnMap = turnMap;

    this.refreshView();

}

TableView.prototype.refreshView = function() {
    for (var i = 0; i < this.game.board.spaces.length; i++) {
        var tile = this.game.board.tiles[i];
        console.log(tile);
    }
};

module.exports = TableView;