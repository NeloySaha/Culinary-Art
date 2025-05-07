const express = require("express");
const router = express.Router();

const verifyToken = require("../controllers/authMiddleware");

const {
  createOrder,
  getOrdersByUserId,
} = require("../controllers/OrderController");

router.use(verifyToken);

router.post("/create-order", createOrder);
router.get("/user-orders", getOrdersByUserId);

module.exports = router;
