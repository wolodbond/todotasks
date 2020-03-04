const http = require("http");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const nodeEnv = process.env.NODE_ENV || "development";
const appConfig = require("./configs/env");

const app = require("./app");

const port = appConfig[nodeEnv].app.port;
const server = http.createServer(app);
server.listen(port, err => {
  if (err) {
    throw err;
  }
  console.log("Express server listening on port " + port);
});
