describe("Cart", function() {
  describe("new cart", function() {
    var cart;

    beforeEach(function() {
      cart = new Cart();
    });

    it("returns zero as total", function() {
      expect(cart.total()).toEqual(0);
    });

    it("has no items", function() {
      expect(cart.getItems()).toEqual([]);
    });
  });

  describe("existing cart", function() {
      var cart;

      beforeEach(function(){
        cart = new Cart();
      });

      it("add an item and returns total", function(){
        cart.addItem({description: "i1", price: 1.5});
        expect(cart.total()).toEqual(1.5);
      });  

      it("return total for duplicated items", function(){
        cart.addItem({description: "i1", price: 1.5});
        cart.addItem({description: "i1", price: 1.5});
        
        expect(cart.total()).toEqual(3.0);
        
        cart.addItem({description: "i1", price: 1.5, quantity: 4});
        expect(cart.total()).toEqual(9.0);
      });

      it("should not duplicate an item that had already existed", function(){
        cart.addItem({description: "i1", price: 1.5});
        cart.addItem({description: "i1", price: 1.5});
        
        expect(cart.getItems()).toEqual([{description: "i1", price: 1.5, quantity: 2}]);
      });
  });
});