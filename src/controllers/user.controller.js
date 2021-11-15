const { request, response } = require("express");
const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const users = await User.find({
    _id: {
      $ne: req.uid,
    },
  });

  res.json({ users });
};

module.exports = { getUsers };
