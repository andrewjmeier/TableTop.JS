var machina = require("machina");

var Turn = machina.Fsm.extend({
        initialize: function( options ) {
            console.log("tests");
        },

        initialState: "setup",

        namespace: "test",

        states: {
            setup: {
                "_onEnter": function() {
                    // do actions here! 
                }
            }
        }
});

module.exports = Turn;
