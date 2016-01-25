var core = Object.assign({

    ArrayBoard: require('./array_board'),
    Board: require('./board'),
    Card: require('./card'),
    Component: require('./component'),
    Constants: require('./ttConstants'),
    Deck: require('./deck'),
    EdgeTile: require('./edge_tile'),
    Game: require('./game'),
    GameOverView: require('./game_over_view'),
    GridBoard: require('./grid_board'),
    ManualTurn: require('./manual_turn'),
    NextPlayerView: require('./next_player_view'),
    Player: require('./player'),
    StartView: require('./start_view'),
    StyleSheets: require('../../src/checkers/style.css'),
    Tile: require('./tile'),
    Token: require('./token'),
    Trade: require('./trade'),
    Turn: require('./turn'),
    Utils: require('./utils'),
    VertexTile: require('./vertex_tile'),
    View: require('./view')

});

module.exports = core;
