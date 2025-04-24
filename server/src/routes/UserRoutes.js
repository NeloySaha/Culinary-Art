const express = require("express");
const router = express.Router();

const {
  signUpVerification,
  createUser,
  loginUser,
} = require("../controllers/UserController");

//send verification email
router.post("/signup-verification", signUpVerification);
//signup user
router.post("/create-user", createUser);
//login user
router.post("/login", loginUser);

module.exports = router;
