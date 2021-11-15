const { Router } = require("express");
const { authValidation } = require("../middleware/validations");
const { getUsers } = require("../controllers/user.controller");
const { validateToken } = require("../middleware/jwt");
const { getMessagesWithUser } = require("../controllers/message.controller");
const router = Router();

router.get("/api/users", validateToken, getUsers);
router.get("/api/messages/:userId", validateToken, getMessagesWithUser);

module.exports = router;
