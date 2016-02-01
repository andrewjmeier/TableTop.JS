var $ = require("jquery");

function TableView(game, turnMap) {
    this.game = game;
    this.turnMap = turnMap;

    this.refreshView();

}

TableView.prototype.refreshView = function() {
    for (var i = 0; i < this.game.board.tiles.length; i++) {
        var tile = this.game.board.tiles[i];
        console.log(tile);
    }
    this.addTokenToTile(0);
};

TableView.prototype.addTokenToTile = function(suffix) {
    $("<div/>", {
        id: 'token' + suffix,
        class: 'token',
    }).appendTo("#tile0");
};

module.exports = TableView;