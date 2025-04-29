const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  CreateCategoryController,
  UpdateCategoryController,
  GetCategoryController,
  GetoneCategoryController,
  DeleteCategoryController,
} = require("../controllers/CategoryController"); // Fixed capitalization

const router = express.Router();

// Routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController
); // Fixed the route path

//Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  UpdateCategoryController
);
module.exports = router;

//Get all Category
router.get("/get-category", GetCategoryController);

//Get single Category
router.get("/getone-category/:slug", GetoneCategoryController);

//Delete single Category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  DeleteCategoryController
);
