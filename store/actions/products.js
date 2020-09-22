export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

import Product from "../../models/product";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      //async operation
      const response = await fetch(
        "https://shop-online-by-me.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Oops! Something went wrong");
      }
      const resData = await response.json();

      let availableProducts = [];
      for (const key in resData) {
        availableProducts.push(
          new Product(
            (id = key),
            (ownerId = resData[key].ownerId),
            (title = resData[key].title),
            (imageUrl = resData[key].imageUrl),
            (description = resData[key].description),
            (price = resData[key].price)
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: availableProducts,
        userProducts: availableProducts.filter(
          (item) => item.ownerId === userId
        ),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    fetch(
      `https://shop-online-by-me.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //asynchronous code here
    try {
      const response = await fetch(
        `https://shop-online-by-me.firebaseio.com/products.json?auth=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ownerId: userId,
            imageUrl,
            title,
            description,
            price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Problem in the product creation");
      }

      const productFromDB = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: productFromDB.id,
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //async operations
    try {
      const response = await fetch(
        `https://shop-online-by-me.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            ownerId: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("An error in product update");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title,
          description,
          imageUrl,
          ownerId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};
