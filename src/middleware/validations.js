const { body } = require("express-validator");

const authValidation = [
  body("email").isEmail().withMessage("El correo no es válido"),
  body("password").isLength({ min: 5 }).withMessage("Contraseña no válida"),
];

module.exports = {
  authValidation,
};
