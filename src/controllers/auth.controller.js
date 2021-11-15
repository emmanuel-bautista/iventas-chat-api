const { request, response } = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req = request, res = response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), body: req.body });
  }

  const user = await User.findOne({
    email: req.body.email,
    // password: req.body.password,
  });

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        uid: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    res.json({ user, token });
  } else {
    res.status(400).json({
      errors: [
        {
          msg: "Correo y/o contraseña incorrectos",
        },
      ],
    });
  }
};

const auth = async (req = request, res = response) => {
  const userId = req.uid;
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    res.status(400).json({
      errors: [
        {
          msg: "Usuario no encontrado",
        },
      ],
    });
  }
  res.json({
    user,
  });
};

module.exports = { login, auth };
