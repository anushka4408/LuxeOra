const slugify = require("slugify");
const ProductModel = require("../models/ProductModel");
const CategoryModel = require("../models/CateoryModel");
const fs = require("fs");
const path = require("path");
const braintree = require("braintree");
const OrderModel = require("../models/OrderModel");
const dotenv = require("dotenv");

dotenv.config();
//PAYMENT GATEWAY
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Validate the product input fields
const validateProduct = ({
  name,
  description,
  price,
  quantity,
  category,
  photo,
}) => {
  if (!name) return "NAME IS REQUIRED";
  if (!description) return "DESCRIPTION IS REQUIRED";
  if (!price) return "PRICE IS REQUIRED";
  if (isNaN(price) || price <= 0) return "PRICE SHOULD BE A POSITIVE NUMBER";
  if (!quantity) return "QUANTITY IS REQUIRED";
  if (isNaN(quantity) || quantity <= 0)
    return "QUANTITY SHOULD BE A POSITIVE NUMBER";
  if (!category) return "CATEGORY IS REQUIRED";
  if (photo && photo.size > 1000000) return "Photo should be less than 1MB";
  return null;
};

// Create Product Controller
const CreateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.fields;
    const { photo } = req.files;

    // Validate the product fields
    const errorMessage = validateProduct({
      name,
      description,
      price,
      quantity,
      category,
      photo,
    });
    if (errorMessage) {
      return res.status(400).json({ success: false, message: errorMessage });
    }

    // Create a new product object
    const product = new ProductModel({
      ...req.fields,
      slug: slugify(name, { lower: true, strict: true }), // Create slug from the product name
    });

    // Handle photo upload if a photo is provided
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path); // Read file data
      product.photo.contentType = photo.type; // Set file type
      // Optional: Delete temporary photo file to avoid clutter
      fs.unlinkSync(photo.path);
    }

    // Save the product in the database
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "ERROR IN CREATING PRODUCT",
      error: error.message || "Internal Server Error",
    });
  }
};

//get
const GetProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "ALL PRODUCTS",
      totalcount: products.length,
      products,
    });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({
      success: false,
      message: "ERROR IN GETTING PRODUCT",
      error: error.message || "Internal Server Error",
    });
  }
};

const GetSingleProductController = async (req, res) => {
  try {
    const products = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "SINGLE PRODUCTS",
      products,
    });
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({
      success: false,
      message: "ERROR IN GETTING PRODUCT",
      error: error.message || "Internal Server Error",
    });
  }
};
//Get PHotos
const PhotoProductController = async (req, res) => {
  try {
    const products = await ProductModel.findById(req.params.pid).select(
      "photo"
    );
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.error("Error getting photo:", error);
    res.status(500).send({
      success: false,
      message: "ERROR IN GETTING PHOTO",
      error: error.message || "Internal Server Error",
    });
  }
};

const DeleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "PRODUCT DELETED SUCCESSFULLY",
    });
  } catch (error) {
    console.error("Error Deleting product:", error);
    res.status(500).send({
      success: false,
      message: "ERROR WHILE DELETING PRODUCT",
      error: error.message || "Internal Server Error",
    });
  }
};

//UPDATING
const UpdateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.fields;
    const { photo } = req.files;

    // Validate the product fields
    const errorMessage = validateProduct({
      name,
      description,
      price,
      quantity,
      category,
      photo,
    });
    if (errorMessage) {
      return res.status(400).json({ success: false, message: errorMessage });
    }

    // Create a new product object
    const product = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    // Handle photo upload if a photo is provided
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path); // Read file data
      product.photo.contentType = photo.type; // Set file type
      // Optional: Delete temporary photo file to avoid clutter
      fs.unlinkSync(photo.path);
    }

    // Save the product in the database
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.error("Error Updating product:", error);
    res.status(500).send({
      success: false,
      message: "ERROR WHILE UPDATING PRODUCT",
      error: error.message || "Internal Server Error",
    });
  }
};

//FILTER

const ProductFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error Filering product:", error);
    res.status(400).send({
      success: false,
      message: "ERROR WHILE FILTERING PRODUCT",
      error: error.message || "Internal Server Error",
    });
  }
};

const ProductCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.error("Error Counting product:", error);
    res.status(400).send({
      success: false,
      message: "ERROR WHILE COUNTING PRODUCT",
      error: error.message || "Internal Server Error",
    });
  }
};

//Product List based on controller
const ProductListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error Per page product:", error);
    res.status(400).send({
      success: false,
      message: "ERROR IN PER PAGE PRODUCT",
      error: error.message || "Internal Server Error",
    });
  }
};

//Search Product
const SearchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "ERROR IN SEARCH PRODUCT API",
      error,
    });
  }
};

//Similar products
const RelatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "ERROR IN SIMILAR PRODUCT API",
      error,
    });
  }
};

const ProductCategoryController = async (req, res) => {
  try {
    // Find the category by slug (case-insensitive)
    const category = await CategoryModel.findOne({
      slug: new RegExp(`^${req.params.slug}$`, "i"),
    });

    // Check if the category exists
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Find products belonging to the found category and populate category details
    const products = await ProductModel.find({
      category: category._id,
    }).populate("category");

    // Send successful response with category and products
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "ERROR IN GETTING CATEGORY PRODUCT ",
      error,
    });
  }
};

//PAYMENT GATEWAY API
//token
const BraintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
const BraintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        // Changed 'error' to 'err'
        if (result) {
          const order = new OrderModel({
            products: cart,
            payment: result, // Changed from 'res' to 'result'
            buyers: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(err); // Changed 'error' to 'err'
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
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
};
