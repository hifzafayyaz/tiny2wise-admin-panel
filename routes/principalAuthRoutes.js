const express = require("express");
const router = express.Router();
const { signupPrincipal } = require("../controllers/principalAuthController");

router.post("/signup", signupPrincipal);

module.exports = router;