const { Router } = require("express");
const { authValidation } = require("../middleware/validations");
const { login, auth } = require("../controllers/auth.controller");
const { validateToken } = require("../middleware/jwt");
const router = Router();

router.post("/api/login", ...authValidation, login);
router.get("/api/auth", validateToken, auth);

module.exports = router;
