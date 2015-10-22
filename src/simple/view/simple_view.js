var constants = {
    canvasWidth : 1000,
    canvasHeight : 200,

    numberOfSpaces : 20
}
function SimpleView(game_state) {
    this.game = game_state;
    this.tiles = [];

    this.renderer = PIXI.autoDetectRenderer(constants.canvasWidth, constants.canvasHeight,
            {backgroundColor : 0x1099bb});

    document.body.appendChild(this.renderer.view);

    // create the root of the scene graph
    this.stage = new PIXI.Container();
};