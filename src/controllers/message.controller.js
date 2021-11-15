const Message = require("../models/message");
const { request, response } = require("express");

const saveMessage = async (socket, message) => {
  const msg = await Message.create({
    content: message.content,
    from: message.from,
    to: message.to,
  });

  return msg;
};

const getMessagesWithUser = async (req = request, res = response) => {
  const messages = await Message.find({
    $or: [
      { $and: [{ from: req.uid }, { to: req.params.userId }] },
      { $and: [{ from: req.params.userId }, { to: req.uid }] },
    ],
  }).sort("createdAt");

  res.json({ messages });
};

module.exports = { saveMessage, getMessagesWithUser };
