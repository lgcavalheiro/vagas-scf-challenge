var { createApp } = require("./src/app");

const app = createApp();

const port = 3000;
app.listen(port, () => {
  console.log(`Express server up @ http://localhost:${port}`);
});
