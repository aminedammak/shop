export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
export const signUp = (email, password) => {
  return async (dispatch) => {
    //asynchronous operations
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2TBzInsxsEn-swEXvAu5nr30BZY1c6EQ",
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
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    //asynchronous operations
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2TBzInsxsEn-swEXvAu5nr30BZY1c6EQ",
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

    console.log("res Login", resData);

    dispatch({ type: LOGIN });
  };
};
