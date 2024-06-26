const cors = require("cors");
const express = require("express");
const playerRouter = require("./app/player/router");
const authRouter = require("./app/auth/router");
const { MongoDBConnection } = require("./libs/lib.database");
const URL = `/api/v1`;

const app = express();

MongoDBConnection();

app.use(express.json());

/**
 * Logging app
 */

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
