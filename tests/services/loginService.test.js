const usersService = require("../../src/services/usersService");
const loginService = require("../../src/services/loginService");
const jwt = require("jsonwebtoken");

describe("LoginService", () => {
  test("should allow logging in if an id with admin privileges is given", () => {
    const res = loginService.login(0);

    expect(res.user.id).toBe(0);
    expect(res.message).toBe("Logged in successfully");
    expect(jwt.verify(res.token, "JWT_AUTH_SECRET").id).toBe(0);
  });

  test("should return null if id is invalid", () => {
    const res = loginService.login("invalid");

    expect(res).toStrictEqual({
      errors: ["Field 'id' is invalid or was not provided"],
    });
  });

  test("should return null if user is not found", () => {
    const res = loginService.login(1234);

    expect(res).toBeUndefined();
  });

  test("should return null if user does not have admin privileges", () => {
    usersService.insertUser("Test Name", "Test Job");

    const res = loginService.login(1);

    expect(res).toBeUndefined();
  });
});
