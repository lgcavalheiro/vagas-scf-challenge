var express = require("express");
var bodyParser = require("body-parser");

createApp = () => {
  var app = express();

  var teste1 = require("./teste1");
  var teste2 = require("./teste2");
  var teste3 = require("./teste3");
  var teste4 = require("./teste4");
  var teste5 = require("./teste5");

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

  app.get("/user", teste1.getUser);
  app.get("/users", teste1.getUsers);
  app.post("/users", teste2);
  app.delete("/users", teste3);
  app.put("/users", teste4);
  app.get("/users/access", teste5);

  return app;
};

module.exports = { createApp };
