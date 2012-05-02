;(function(window){
  var Cart;

  Cart = window.Cart = function() {
    this.items = {};
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
  };

  Cart.fn.removeItem = function(item, quantity){    
    if(this.items[item.description]){
      var existingItem = this.items[item.description];
      existingItem.quantity -= quantity;
      if(existingItem.quantity <= 0) 
        delete(this.items[existingItem.description]);
    }
  }

  Cart.fn.total = function() {
    var total = 0;

    for (var name in this.items) {
      if (this.items.hasOwnProperty(name)) {
        total += this.items[name].quantity * this.items[name].price;
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
})(window);
