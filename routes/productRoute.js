const {
  CreateProductController,
  GetProductController,
  GetSingleProductController,
  PhotoProductController,
  DeleteProductController,
  UpdateProductController,
  ProductFilterController,
  ProductCountController,
  ProductListController,
  SearchProductController,
  RelatedProductController,
  ProductCategoryController,
  BraintreeTokenController,
  BraintreePaymentController,
} = require("../controllers/ProductController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const express = require("express");
const formidable = require("express-formidable");

const router = express.Router();

// Route for creating a product
router.post(
  "/create-product",
  requireSignIn, // Middleware to check if the user is signed in
  isAdmin, // Middleware to check if the user is an admin
  formidable(), // Middleware to handle file uploads and parsing
  CreateProductController // Controller to handle product creation
);

//get products
router.get("/get-product", GetProductController);

//get single product
router.get("/getsingle-product/:slug", GetSingleProductController);
//get photo
router.get("/product-photo/:pid", PhotoProductController);

//delete produce
router.delete("/delete-product/:pid", DeleteProductController);

//Updating PRODUCT
router.put(
  "/update-product/:pid",
  requireSignIn, // Middleware to check if the user is signed in
  isAdmin, // Middleware to check if the user is an admin
  formidable(), // Middleware to handle file uploads and parsing
  UpdateProductController // Controller to handle product creation
);

//FILTER PRODUCT
router.post("/product-filter", ProductFilterController);

//Product Count
router.get("/product-count", ProductCountController);

//Product per page
router.get("/product-list/:page", ProductListController);

//Search Product
router.get("/search/:keyword", SearchProductController);

//Similar Product
router.get("/related-product/:pid/:cid", RelatedProductController);

//Category wise Product get
router.get("/product-category/:slug", ProductCategoryController);

//PAYMENTS ROUTE
//TOKEN
router.get("/braintree/token", BraintreeTokenController);

//PAYMENTS
router.post("/braintree/payment", requireSignIn, BraintreePaymentController);

module.exports = router;
