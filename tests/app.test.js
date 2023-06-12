const request = require("supertest");
const { createApp } = require("../src/app");
const usersController = require("../src/controllers/UsersController");

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
  });

  test("GET /user should call teste1.getUser and return the response", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
    expect(response.text).toBe("getUser response");
    expect(usersController.getUser).toHaveBeenCalled();
  });

  test("GET /users should call teste1.getUsers and return the response", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.text).toBe("getUsers response");
    expect(usersController.getUsers).toHaveBeenCalled();
  });

  test("POST /users should call teste2 and return the response", async () => {
    const response = await request(app).post("/users");
    expect(response.status).toBe(200);
    expect(response.text).toBe("insertUser response");
    expect(usersController.insertUser).toHaveBeenCalled();
  });

  test("DELETE /users should call teste3 and return the response", async () => {
    const response = await request(app).delete("/users");
    expect(response.status).toBe(200);
    expect(response.text).toBe("deleteUser response");
    expect(usersController.deleteUser).toHaveBeenCalled();
  });

  test("PUT /users should call teste4 and return the response", async () => {
    const response = await request(app).put("/users");
    expect(response.status).toBe(200);
    expect(response.text).toBe("updateUser response");
    expect(usersController.updateUser).toHaveBeenCalled();
  });

  test("GET /users/access should call teste5 and return the response", async () => {
    const response = await request(app).get("/users/access");
    expect(response.status).toBe(200);
    expect(response.text).toBe("getUserAccess response");
    expect(usersController.getUserAccess).toHaveBeenCalled();
  });
});
