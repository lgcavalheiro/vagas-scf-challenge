require("dotenv").config();
const { createApp } = require("./src/app");
const { exit } = require("process");

const app = createApp();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

if (!process.env.AUTH_SECRET) {
  console.error("AUTH_SECRET was not defined. Shutting down server...");
  exit(1);
}

app.listen(port, () => {
  console.info(`Express server up @ http://${host}:${port}`);
});
