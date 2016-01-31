/**
 * The Component class
 * All game components should inherit from this class
 * @constructor
 * @param {int} type - the type of messages that the component subscribes to 
*/
function Component(type) {
    this.subscribers = [];
}

/*
Standard message emitter functions for model tabletop model components
The message passing implementation is inspired by machina.js event emitters.
*/

/**
 * Method to broadcast a message out to the other components
 * @param {string} message - Message to send
 * @returns {void}
*/
Component.prototype.sendMessage = function(message) {
    for (var i = 0; i < this.subscribers.length; i++) {
        console.log(this.subscribers[i]);
        this.subscribers[i].call(this, message);       
    }
};

/**
 * Method to subscribe to messages
 * @param {func} callback - A callback method to pass the message to
 * @returns {void}
*/
Component.prototype.subscribe = function(callback) {
    this.subscribers.push(callback);
};

module.exports = Component; 