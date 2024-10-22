const express = require("express");
const path = require("path");
const errorHandler = require("./middleware/error/errorHandler");
const { generalRateLimiter } = require("./utils/rateLimiters");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/config/.env" });
require("./db/mongoose");

const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use(generalRateLimiter);
app.use(userRouter);
app.use(cors({ origin: true, credentials: true }));

app.use("/user", userRouter);

app.use(errorHandler);
module.exports = app;
