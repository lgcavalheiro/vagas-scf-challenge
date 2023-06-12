var express = require("express");
var bodyParser = require("body-parser");

createApp = () => {
  var app = express();

  const usersController = require("./controllers/UsersController");

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
  `);
  });

  app.get("/user", usersController.getUser);
  app.get("/users", usersController.getUsers);
  app.post("/users", usersController.insertUser);
  app.delete("/users", usersController.deleteUser);
  app.put("/users", usersController.updateUser);
  app.get("/users/access", usersController.getUserAccess);

  return app;
};

module.exports = { createApp };
