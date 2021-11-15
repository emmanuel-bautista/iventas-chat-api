require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const moongose = require("./database/database");
const {
  listenSocketEvent,
  createSocketServer,
} = require("./services/socket.service");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// config cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token"
  );

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use(authRouter);
app.use(userRouter);

// assets
app.use(express.static(path.join(__dirname, "assets")));

createSocketServer(server);
