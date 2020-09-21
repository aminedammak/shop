import { keys } from "../../keys";
export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
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
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      console.log("res sign up", resData);

      dispatch({ type: SIGN_UP });
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

      console.log("res Login", resData);

      dispatch({ type: LOGIN });
    } catch (error) {
      throw error;
    }
  };
};
