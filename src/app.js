const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const seedRouter = require("./routes/v1/seedRouter");
const userRouter = require("./routes/v1/userRouter");
const { errorResponse } = require("./errorHandler/errorHandler");

const app = express();

// API Limiter
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests from this API, please try again later",
});

app.use(rateLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/seed", seedRouter);

// Client error handling
app.use((req, res, next) => {
  next(createError(404, "Route not found!"));
});

// Server error handling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
