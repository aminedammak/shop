export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";
import Order from "../../models/order";

export const addOrder = (userId, cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      //async work
      const response = await fetch(
        `https://shop-online-by-me.firebaseio.com/orders/${userId}.json?auth=${token}`,
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

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    //asynchrounous code
    const response = await fetch(
      `https://shop-online-by-me.firebaseio.com/orders/${userId}.json`
    );

    if (!response.ok) {
      throw new Error("Problem in reading orders");
    }

    const responseData = await response.json();

    let ordersLoaded = [];

    for (key in responseData) {
      ordersLoaded.push(
        new Order(
          key,
          responseData[key].items,
          responseData[key].amount,
          new Date(responseData[key].date)
        )
      );
    }

    dispatch({
      type: SET_ORDERS,
      orders: ordersLoaded,
    });
  };
};
