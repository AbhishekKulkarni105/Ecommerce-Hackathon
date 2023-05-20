const user = require("../controllers/user.controller");
const router = require("express").Router();

// POST : /api/auth/login
router.post("/login",user.login);

// POST : /api/auth/register
router.post("/register", user.register);
router.get("/profile",user.profile);

module.exports = router;