Component = require("./component.js");
    inherits = require('util').inherits;

var machina = require('machina');

var Turn = machina.Fsm.extend({
        initialize: function( ) {
        },

        initialState: 'uninitialized',

        namespace: 'test',

        states: {
            setup: {
                '_onEnter': function() {
                }
            }
        }
});

module.exports = Turn;
