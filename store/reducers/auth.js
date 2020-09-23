import { AUTHENTICATE } from "../actions/auth";
const initialState = {
  token: "",
  userId: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };

    default:
      return state;
  }
};
