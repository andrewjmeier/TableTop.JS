Component = require("./component.js");
    inherits = require('util').inherits;

var machina = require('machina');

var Turn = machina.Fsm.extend({
        initialize: function( ) {
            // console.log('tests');
        },

        initialState: 'uninitialized',

        namespace: 'test',

        states: {
            setup: {
                '_onEnter': function() {
                    // console.log('hello');
                }
            }
        }
});

module.exports = Turn;
