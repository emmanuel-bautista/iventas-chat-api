const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("x-access-token");

  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "No tienes permiso para ejecutar esta acción",
        },
      ],
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      errors: [
        {
          msg: "No tienes permiso para ejecutar esta acción",
        },
      ],
    });
  }
};

module.exports = {
  validateToken,
};
