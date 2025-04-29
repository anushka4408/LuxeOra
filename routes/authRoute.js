const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotpasswordcontroller,
  UpdateProfileController,
  GetOrderController,
  GetAllOrderController,
  OrderStatusController,
  GetAllUserController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
//router object
const router = express.Router();

//routing
//REGISTER|| METHOD POST
router.post("/register", registerController);

//LOGIN|| method POST
router.post("/login", loginController);

//Forgot Password
router.post("/forgot-password", forgotpasswordcontroller);
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//Protected Route for dashbord
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Admin Route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile
router.put("/profile", requireSignIn, UpdateProfileController);

//ORDERS
router.get("/orders", requireSignIn, GetOrderController);

// ALL ORDERS
router.get("/all-orders", requireSignIn, isAdmin, GetAllOrderController);

// Update Status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  OrderStatusController
);

//GET ALL USER DETAILS
router.get("/all-users", requireSignIn, isAdmin, GetAllUserController);

module.exports = router;
