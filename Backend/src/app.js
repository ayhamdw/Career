const express = require("express");
const path = require("path");
const errorHandler = require("./middleware/error/errorHandler");
require("dotenv").config({ path: __dirname + "/config/.env" });
const { generalRateLimiter } = require("./utils/rateLimiters");
require("./db/mongoose");

const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use(generalRateLimiter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.status(404).send("API is running");
});

app.use(errorHandler);
module.exports = app;
