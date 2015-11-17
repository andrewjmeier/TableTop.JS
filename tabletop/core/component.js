function Component(type) {
    this.subscribers = [];
}

/*
Standard message emitter functions for model tabletop model components
The message passing implementation is inspired by machina.js event emitters.
*/

Component.prototype.sendMessage = function(message) {
    for (var i = 0; i < this.subscribers.length; i++) {
        console.log(this.subscribers[i]);
        this.subscribers[i].call(this, message);       
    }
};

Component.prototype.subscribe = function(callback) {
    this.subscribers.push(callback);
};

module.exports = Component; 