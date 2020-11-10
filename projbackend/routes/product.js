const express = require("express");
const router = express.Router();
//const { getCategoryById } = require("../controllers/category");
const { isSignedin, isAdmin, isAuthenticated } = require("../controllers/auth");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllUniqueCate,
  getAllProduct,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
//router.param("categoryId", getCategoryById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  createProduct
);
//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete routes
router.delete(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
router.put(
  "/product/:productId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateProduct
);
//listing routes

router.get("/product", getAllProduct);

router.get("/product/categories", getAllUniqueCate);
module.exports = router;
