export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

import Product from "../../models/product";

export const fetchProducts = () => {
  return async (dispatch) => {
    //async operation
    const response = await fetch(
      "https://shop-online-by-me.firebaseio.com/products.json"
    );

    const resData = await response.json();

    let availableProducts = [];
    for (let key in resData) {
      availableProducts.push(
        new Product(
          key,
          resData[key].ownerId,
          resData[key].imageUrl,
          resData[key].title,
          resData[key].description,
          resData[key].price
        )
      );
    }

    console.log(availableProducts);
    dispatch({
      type: SET_PRODUCTS,
      products: availableProducts,
    });
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    //asynchronous code here
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
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
