import Cart from './Cart';
describe('Cart', () => {
  let cart;
  let product = {
    title: 'Adidas running shoes',
    price: 35388,
  };

  let product2 = {
    title: 'Adidas running shoes',
    price: 41872,
  };
  beforeEach(() => {
    cart = new Cart();
  });
  it('should  return 0 when getTotal is executed in a newly created instance', () => {
    expect(cart.getTotal()).toEqual(0);
  });

  it('should  multiply quantity and price and receive the total amount', () => {
    const item = {
      product,
      quantity: 2,
    };
    cart.add(item);
    expect(cart.getTotal()).toEqual(70776);
  });

  it('shold ensure no more than on product exists at a time', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product,
      quantity: 1,
    });
    expect(cart.getTotal()).toEqual(35388);
  });

  it('should update total when a product gets included and then removed', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product: product2,
      quantity: 1,
    });

    cart.remove(product);
    expect(cart.getTotal()).toEqual(41872);
  });
});
