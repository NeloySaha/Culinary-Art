const express = require("express");
const router = express.Router();

const {
  signUpVerification,
  createUser,
} = require("../controllers/UserController");

//send verification email
router.post("/signup-verification", signUpVerification);
//create user
router.post("/create-user", createUser);

module.exports = router;
