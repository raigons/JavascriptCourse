;(function(window){
  var Cart;

  Cart = window.Cart = function() {
    this.items = {};
    this.emitter = new Emitter();
  };

  Cart.fn = Cart.prototype;

  Cart.fn.addItem = function(attributes) {
    var item = new Cart.Item(attributes)
      , existing = this.items[item.description]
    ;

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items[item.description] = item;
    }

    this.emit("update");
  };

  Cart.fn.emit = function(event) {
    this.emitter.emit(event);
  };

  Cart.fn.removeItem = function(item, quantity) {
    var existing = this.items[item.description];

    if (!existing) {
      return;
    }

    existing.quantity -= quantity;

    if (existing.quantity <= 0) {
      delete(this.items[item.description]);
    }

    this.emit("update");
  };

  Cart.fn.getItem = function(description) {
    return this.items[description];
  };

  Cart.fn.on = function(event, callback) {
    this.emitter.on(event, callback);
  };

  Cart.fn.total = function() {
    var total = 0;

    for (var name in this.items) {
      if (this.items.hasOwnProperty(name)) {
        total += this.items[name].total();
      }
    }

    return total;
  };

  Cart.fn.getItems = function() {
    var result = [];

    for (var name in this.items) {
      if (this.items.hasOwnProperty(name)) {
        result.push(this.items[name]);
      }
    }

    return result;
  };

  Cart.Item = function(attributes) {
    this.description = null;
    this.price = null;
    this.quantity = 1;

    for (var name in attributes) {
      if (attributes.hasOwnProperty(name) && this.hasOwnProperty(name)) {
        this[name] = attributes[name];
      }
    }
  };

  Cart.Item.prototype.total = function() {
    return this.quantity * this.price;
  };
})(window);