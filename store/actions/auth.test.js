import * as authActions from "./auth";
import { AUTHENTICATE, LOGOUT } from "./auth";

describe("Auth actions", () => {
  it("Should create an AUTHENTICATE action", () => {
    const userId = "userIdfortest";
    const token = "tokenfortest";

    const expectedAction = {
      type: AUTHENTICATE,
      userId,
      token,
    };

    expect(authActions.authenticate(userId, token)).toEqual(expectedAction);
  });
});
