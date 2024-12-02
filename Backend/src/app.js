const express = require("express");
const path = require("path");
const multer = require("multer");
const errorHandler = require("./middleware/error/errorHandler");
const { generalRateLimiter } = require("./utils/rateLimiters");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/config/.env" });
require("./db/mongoose");

const userRouter = require("./routers/userRouter");
const friendsRouter = require("./routers/friendsRouter");
const messagesRouter = require("./routers/messagesRouter");
const authRouter = require("./routers/authRouter");
const passwordRouter = require("./routers/passwordRouter");
const checkInformationRouter = require("./routers/checkInformationRouter");
const proficientRouter = require("./routers/proficientRouter");
const sendVerificationCode = require("./routers/accountRouter")

const app = express();

app.use(express.json());
app.use(generalRateLimiter);
app.use(userRouter);
app.use(cors({ origin: true, credentials: true }));
app.use(
  "/assets/images",
  express.static(path.join(__dirname, "assets/images"))
);

// app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/password", passwordRouter);
app.use("/api/check", checkInformationRouter);
app.use("/api/user", userRouter);
app.use("/api/proficient", proficientRouter);
app.use("/api/send",sendVerificationCode)

app.use(errorHandler);
module.exports = app;
