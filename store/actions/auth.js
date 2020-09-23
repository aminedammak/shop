import { keys } from "../../keys";
export const AUTHENTICATE = "AUTHENTICATE";

import { AsyncStorage } from "react-native";

export const authenticate = (userId, token) => {
  return {
    type: AUTHENTICATE,
    token,
    userId,
  };
};

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      //asynchronous operations
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keys.api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();

        let message = "Something went wrong!";

        const errorId = responseData.error.message;

        if (errorId === "EMAIL_EXISTS") {
          message = "The email address is already in use by another account";
        }
        throw new Error(message);
      }

      const resData = await response.json();

      console.log("res sign up", resData);

      dispatch({
        type: AUTHENTICATE,
        token: resData.idToken,
        userId: resData.localId,
      });
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );

      saveDataToStorage(resData.localId, resData.idToken, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      //asynchronous operations
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keys.api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();

        let message = "Something went wrong!";

        const errorId = responseData.error.message;

        if (errorId === "EMAIL_NOT_FOUND") {
          message = "This email is not valid";
        } else if (errorId === "INVALID_PASSWORD") {
          message = "This password is not valid";
        }
        throw new Error(message);
      }

      const resData = await response.json();

      dispatch({
        type: AUTHENTICATE,
        token: resData.idToken,
        userId: resData.localId,
      });

      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );

      saveDataToStorage(resData.localId, resData.idToken, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

export const saveDataToStorage = async (userId, token, expirationDate) => {
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userId,
      token: token,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
