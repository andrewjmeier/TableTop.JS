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

function Message(message_text, type) {
    this.text = message_text;
    if (!type) {
        this.type
    }
}

/**
 * Method to broadcast a message out to the other components
 * @param {string} message - Message to send
 * @returns {void}
*/
Component.prototype.sendMessage = function(message, type) {
    if (type == null) {
        type = "standard";
    }

    messageObj = {
        type: type,
        text: message,
        sender: this
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
    child.subscribe(function(message) {
        this.sendMessage(message);
    });
}

module.exports = Component;