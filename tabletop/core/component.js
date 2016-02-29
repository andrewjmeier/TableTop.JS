/**
 * The Component class
 * All game components should inherit from this class
 * @constructor
*/
function Component() {
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
Component.prototype.sendMessage = function(message, type, sender, clientID) {

    type = type || "standard";
    sender = sender || this;
    if (undefined == clientID) {
        clientID = -1;
    }

    messageObj = {
        type: type,
        text: message,
        sender: sender,
        clientID: clientID
    };

    for (var i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i].call(this, messageObj);
    }
};

/**
 * Method to subscribe to messages
 * @param {func(message)} callback - A callback method to pass the message to
 * @returns {void}
*/
Component.prototype.subscribe = function(callback) {
    this.subscribers.push(callback);
};

/**
 * Method to propagate the message of a child element to the next level of the model
 * @param {component} child - Child to forward messages
 * @return {void}
*/
Component.prototype.propagate = function(child) {
    var context = this;
    child.subscribe(function(messageObj) {
        context.sendMessage(messageObj.text, messageObj.type, messageObj.sender, messageObj.clientID);
    });
}

module.exports = Component;