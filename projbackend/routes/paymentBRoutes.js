const express = require("express");
const { isSignedin, isAuthenticated } = require("../controllers/auth");
const { getToken, processMoney } = require("../controllers/paymentB");
const { getUserById } = require("../controllers/user");
const router = express.Router();
router.param("userId", getUserById);
router.get("/payment/gettoken/:userId", isSignedin, isAuthenticated, getToken);
router.post(
  "/payment/braintree/:userId",
  isSignedin,
  isAuthenticated,
  processMoney
);
module.exports = router;
