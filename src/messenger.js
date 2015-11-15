function Messenger(type) {
    this.eventType = type;
}

Messenger.prototype.sendMessage = function(message) {
    ev = new Event(this.eventType, {detail: message, bubbles: true});
    ev.
};