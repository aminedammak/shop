export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    try {
      //async work
      const response = await fetch(
        "https://shop-online-by-me.firebaseio.com/orders/u1.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            amount: totalAmount,
            date: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Oops! Problem in adding order");
      }

      const responseData = await response.json();

      dispatch({
        id: responseData.id,
        type: ADD_ORDER,
        orderData: { items: cartItems, amount: totalAmount },
        date: responseData.date,
      });
    } catch (error) {
      throw error;
    }
  };
};
