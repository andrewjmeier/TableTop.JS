/**
 * @file        Main export of the PIXI core library
 * @author      Mat Groves <mat@goodboydigital.com>
 * @copyright   2013-2015 GoodBoyDigital
 * @license     {@link https://github.com/pixijs/pixi.js/blob/master/LICENSE|MIT License}
 */

/**
 * @namespace PIXI
 */
// export core and const. We assign core to const so that the non-reference types in const remain in-tact
var core = Object.assign(require('./const'), {

    Board: require('./board'),
    Game: require('./game'),
    EdgeTile: require("./edge_tile"),
    Player: require('./player'),
    Turn: require('./turn'),
    Tile: require('./tile'),
    Token: require('./token'),
    Utils: require('./utils'),
    VertexTile: require('./vertex_tile')

});

module.exports = core;
