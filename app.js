const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const mealPlanRouter = require("./routes/mealplan");

// const apiRouter = require("./routes/api");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function(req, res, next) {
  res.send("Access the API at path /api");
});

// app.use("/api", apiRouter);
app.use("/api/mealplan", mealPlanRouter);

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
