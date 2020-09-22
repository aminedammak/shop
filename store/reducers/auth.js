import { SIGN_UP, LOGIN } from "../actions/auth";
const initialState = {
  token: "",
  userId: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOGIN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
