import { ADD_TO_CART, REMOVE_FROM_CART } from "./cart";
import * as cartActions from "./cart";

describe("Cart actions", () => {
  it("should create an ADD_TO_CART action", () => {
    const product = {};

    const expectedAction = {
      type: ADD_TO_CART,
      product,
    };

    expect(cartActions.addToCart(product)).toEqual(expectedAction);
  });

  it("should create a REMOVE_FROM_CART action", () => {
    const productId = "productIdForTest";

    const expectedAction = {
      type: REMOVE_FROM_CART,
      pid: productId,
    };

    expect(cartActions.removeFromCart(productId)).toEqual(expectedAction);
  });
});
