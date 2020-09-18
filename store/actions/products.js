export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

import Product from "../../models/product";

export const fetchProducts = () => {
  return async (dispatch) => {
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
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    fetch(
      `https://shop-online-by-me.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    //asynchronous code here
    try {
      const response = await fetch(
        "https://shop-online-by-me.firebaseio.com/products.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ownerId: "u1",
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
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    //async stuff
    try {
      const response = await fetch(
        `https://shop-online-by-me.firebaseio.com/products/${id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
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
        },
      });
    } catch (error) {
      throw error;
    }
  };
};
