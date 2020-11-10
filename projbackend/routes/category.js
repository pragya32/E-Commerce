const express = require("express");
const { Router } = require("express");
const router = express.Router();
const {
  getCategoryById,
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const { isSignedin, isAdmin, isAuthenticated } = require("../controllers/auth");
//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual routes
//create route
router.post(
  "/category/create/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  createCategory
);

//read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//update routes

router.put(
  "/category/:categoryId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete routes
router.delete(
  "/category/:categoryId/:userId",
  isSignedin,
  isAuthenticated,
  isAdmin,
  removeCategory
);
module.exports = router;
