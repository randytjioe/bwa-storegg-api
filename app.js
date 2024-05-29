
const cors = require("cors");
const express = require("express");
const { Logging } = require("./libs/lib.logging");
const playerRouter = require("./app/player/router");
const authRouter = require("./app/auth/router");
const { MongoDBConnection } = require("./libs/lib.database");
const URL = `/api/v1`;
const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const app = express();

MongoDBConnection();

app.use(express.json());

app.use(cors(corsConfig));
app.options("", cors(corsConfig));
/**
 * Logging app
 */
app.use((req, res, next) => {
  // Log an info message for each incoming request
  Logging.info(`Received a ${req.method} request for ${req.url}`);
  return next();
});
//api
app.use(`${URL}/players`, playerRouter);
app.use(`${URL}/auth`, authRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = {
  app,
};
