const request = require("supertest");
const jwt = require("jsonwebtoken");
const { constants } = require("http2");
const { createApp } = require("../src/app");
const usersController = require("../src/controllers/UsersController");
const loginController = require("../src/controllers/LoginController");

usersController.getUser = jest.fn((req, res) => res.send("getUser response"));
usersController.getUsers = jest.fn((req, res) => res.send("getUsers response"));
usersController.insertUser = jest.fn((req, res) =>
  res.send("insertUser response")
);
usersController.deleteUser = jest.fn((req, res) =>
  res.send("deleteUser response")
);
usersController.updateUser = jest.fn((req, res) =>
  res.send("updateUser response")
);
usersController.getUserAccess = jest.fn((req, res) =>
  res.send("getUserAccess response")
);

loginController.postLogin = jest.fn((req, res) =>
  res.send("postLogin response")
);

describe("App Routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  test("GET / should return a list of available routes", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("get user/");
    expect(response.text).toContain("get users/");
    expect(response.text).toContain("post users/");
    expect(response.text).toContain("delete users/");
    expect(response.text).toContain("put users/");
    expect(response.text).toContain("post login/");
  });

  test("GET /user should call getUser and return the response", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
    expect(response.text).toBe("getUser response");
    expect(usersController.getUser).toHaveBeenCalled();
  });

  test("GET /users should call getUsers and return the response", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.text).toBe("getUsers response");
    expect(usersController.getUsers).toHaveBeenCalled();
  });

  test("POST /users should call insertUser and return the response", async () => {
    const response = await request(app).post("/users");
    expect(response.status).toBe(200);
    expect(response.text).toBe("insertUser response");
    expect(usersController.insertUser).toHaveBeenCalled();
  });

  test("DELETE /users should call deleteUser and return the response", async () => {
    jwt.verify = jest.fn().mockReturnValueOnce({ id: 0 });

    const response = await request(app)
      .delete("/users")
      .set("Authorization", "JWT token");
    expect(response.status).toBe(200);
    expect(response.text).toBe("deleteUser response");
    expect(usersController.deleteUser).toHaveBeenCalled();
  });

  test("DELETE /users should not let delete operation occur if token is invalid", async () => {
    usersController.deleteUser.mockClear();
    jwt.verify = jest.fn().mockReturnValueOnce({ id: 123.456 });

    const response = await request(app)
      .delete("/users")
      .set("Authorization", "JWT token");
    expect(response.status).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
    expect(usersController.deleteUser).not.toHaveBeenCalled();
  });

  test("PUT /users should call updateUser and return the response", async () => {
    jwt.verify = jest.fn().mockReturnValueOnce({ id: 0 });

    const response = await request(app)
      .put("/users")
      .set("Authorization", "JWT token");
    expect(response.status).toBe(200);
    expect(response.text).toBe("updateUser response");
    expect(usersController.updateUser).toHaveBeenCalled();
  });

  test("PUT /users should not let operation occur if token is invalid", async () => {
    usersController.updateUser.mockClear();
    jwt.verify = jest.fn().mockReturnValueOnce({ id: "invalid" });

    const response = await request(app)
      .put("/users")
      .set("Authorization", "JWT token");
    expect(response.status).toBe(constants.HTTP_STATUS_UNAUTHORIZED);
    expect(usersController.updateUser).not.toHaveBeenCalled();
  });

  test("GET /users/access should call getUserAccess and return the response", async () => {
    const response = await request(app).get("/users/access");
    expect(response.status).toBe(200);
    expect(response.text).toBe("getUserAccess response");
    expect(usersController.getUserAccess).toHaveBeenCalled();
  });

  test("POST /login should call postLogin and return the response", async () => {
    const response = await request(app).post("/login");
    expect(response.status).toBe(200);
    expect(response.text).toBe("postLogin response");
    expect(loginController.postLogin).toHaveBeenCalled();
  });
});
