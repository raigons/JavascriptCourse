describe("Cart Item", function(){
	var item;

	it("Sets default quantity", function(){
		item = new Cart.Item();
		expect(item.quantity).toEqual(1);
	});

	it("Sets attributes when initializing object", function(){
		item = new Cart.Item({description: 'i1', price: 2.5, quantity: 5});
		expect(item.description).toEqual('i1');
		expect(item.price).toEqual(2.5);
		expect(item.quantity).toEqual(5);
	});

	it("ignores unknown attributes", function(){
		item = new Cart.Item({invalid: "INVALID"});
		expect(item.invalid).toEqual(undefined);
	});
});