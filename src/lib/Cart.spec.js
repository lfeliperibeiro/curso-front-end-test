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

  describe('getTotal', () => {
    it('should  return 0 when getTotal is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should  multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };
      cart.add(item);
      expect(cart.getTotal().getAmount()).toEqual(70776);
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
      expect(cart.getTotal().getAmount()).toEqual(35388);
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
      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkout', () => {
    it('should return object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 3,
      });
      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should reset the cart when checkout is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should return object with the total and the list of items when sumary is called', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 3,
      });
      expect(cart.sumary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });
  });

  describe('Special conditions', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it('should apply quantity discount for even quatities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount for add quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should not apply percentage discount quantity is below or equals minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
  });
});
