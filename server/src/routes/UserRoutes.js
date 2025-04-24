const express = require("express");
const router = express.Router();

const {
  signUpVerification,
  createUser,
  loginUser,
  getUser,
} = require("../controllers/UserController");

//send verification email
router.post("/signup-verification", signUpVerification);
//signup user
router.post("/create-user", createUser);
//login user
router.post("/login", loginUser);
//info of a user
router.get("/user-info/:id", getUser);

module.exports = router;
