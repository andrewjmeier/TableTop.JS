// run the polyfills

var core = module.exports = require('./core');

// export a premade loader instance
/**
 * A premade instance of the loader that can be used to loader resources.
 *
 * @name loader
 * @memberof PIXI
 * @property {PIXI.loaders.Loader}
 */

// mixin the deprecation features.
Object.assign(core);

// Always export pixi globally.
global.TableTop = core;