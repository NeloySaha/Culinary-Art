const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSearchedProducts,
  getSingleProduct,
  getProductCategory,
  getFilteredProducts,
  getFilterData,
} = require("../controllers/ProductController");
// const verifyToken = require("../controllers/authMiddleware");

// router.get("/", (req, res) => res.send("All products parent route"));
// router.get("/all-products", ProductController.getAllProducts);
// router.get("/products/search/:name", ProductController.getSearchedProducts);
// router.get("/products/single/:id", ProductController.getSingleProduct);
// router.get("/products/:category", ProductController.getProductCategory);

// router.post("/products", verifyToken, ProductController.createProduct);
// router.get("/products", verifyToken, ProductController.getProducts);
// router.put("/products/:id", verifyToken, ProductController.updateProduct);
// router.delete("/products/:id", verifyToken, ProductController.deleteProduct);

// router.post("/billing", verifyToken, ProductController.postCartBill);
// router.get("/orders", verifyToken, ProductController.getAllOrders);
// router.get("/orders/:id", verifyToken, ProductController.getOrderById);
// router.put("/orders/:id", verifyToken, ProductController.updateOrder);
// router.delete("/orders/:id", verifyToken, ProductController.deleteOrder);

// module.exports = router;

// Get all products
router.get("/", getFilteredProducts); // Replace with the new filtered function

// Get filter data (categories and price range)
router.get("/filter-data", getFilterData);

// Get products by search term
router.get("/search/:name", getSearchedProducts);

// Get products by category
router.get("/category/:category", getProductCategory);

// Get single product
router.get("/single-product/:id", getSingleProduct);

module.exports = router;
