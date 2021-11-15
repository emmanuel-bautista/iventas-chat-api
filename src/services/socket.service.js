const jwt = require("jsonwebtoken");
const { SEND_MESSAGE, PRIVATE_MESSAGE } = require("../constants/socketEvents");
const { saveMessage } = require("../controllers/message.controller");

const getUserIdFromToken = (token) => {
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    return uid;
  } catch (error) {
    return null;
  }
};

const createSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  const port = process.env.PORT || 5000;

  io.on("connection", (socket) => {
    console.log("Client connected");

    const userId = getUserIdFromToken(
      socket.handshake.headers["x-access-token"]
    );

    if (userId) {
      socket.join(userId);
      socket.on(SEND_MESSAGE, async (data) => {
        socket.to(data.to).emit(
          PRIVATE_MESSAGE,
          await saveMessage(socket, {
            ...data,
            from: userId,
          })
        );
      });
    } else {
      socket.disconnect();
    }

    socket.on("disconnect", (data) => {
      console.log("Client disconnect");
    });
  });
  server.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
};

module.exports = { createSocketServer };
