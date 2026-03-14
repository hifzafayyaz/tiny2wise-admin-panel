const express = require("express");
const router = express.Router();
const {
  signupPrincipal,
  signinPrincipal
} = require("../controllers/principalAuthController");

router.post("/signup", signupPrincipal);
router.post("/signin", signinPrincipal);

module.exports = router;