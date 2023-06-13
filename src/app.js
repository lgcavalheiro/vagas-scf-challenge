const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./middlewares/auth");
const usersController = require("./controllers/usersController");
const loginController = require("./controllers/loginController");

createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", function (req, res) {
    res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  post login/ </br>
  `);
  });

  app.get("/user", usersController.getUser);
  app.get("/users", usersController.getUsers);
  app.post("/users", usersController.insertUser);
  app.delete("/users", auth, usersController.deleteUser);
  app.put("/users", auth, usersController.updateUser);
  app.get("/users/access", usersController.getUserAccess);
  app.post("/login", loginController.postLogin);

  return app;
};

module.exports = { createApp };
