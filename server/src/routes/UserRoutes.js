const express = require("express");
const router = express.Router();

const {
  signUpVerification,
  createUser,
  loginUser,
  getUser,
  forgetPassVerification,
  resetPassword,
} = require("../controllers/UserController");

//send signup verification email
router.post("/signup-verification", signUpVerification);
//signup user
router.post("/create-user", createUser);

//send forget password verification email
router.post("/forget-password-verification", forgetPassVerification);
//reset user password
router.post("/reset-password", resetPassword);

//login user
router.post("/login", loginUser);

//info of a user
router.get("/user-info/:id", getUser);

module.exports = router;
