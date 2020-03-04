const express = require("express");
const app = express();

const passport = require("passport");
require("./passport");
const { postgraphile } = require("postgraphile");

const bodyParser = require("body-parser");

const corsHandler = require("./middleware/mainHandlers/corsHandler");
const errorHandlers = require("./middleware/errorHandlers");

const tasksRoutes = require("./routes/api/v1/tasks");
const mainRoutes = require("./routes/api/v1/main");
const auth = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(corsHandler);

app.use("/auth", auth);

// TODO: make propers env file/ PROCESS...
app.use(
  passport.authenticate("jwt", { session: false }),
  postgraphile(
    "postgres://postgres:test_postgraph_pass@postgres_torba:5432/test_postgres_db",
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true
    }
  )
);
/*
const router = express.Router();
app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  router.get("/", (req, res, next) => {
    res.status(200).json({ user: "here" });
  })
);
*/
app.use(
  "/api/v1/users",
  passport.authenticate("jwt", { session: false }),
  tasksRoutes
);

app.use("/", mainRoutes);

app.use(errorHandlers.notFoundErrorHandler);

module.exports = app;
