const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

//protect user routes using token
const requireSignIn = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.send({
        success: false,
        message: "UNAUTHORIZED ACCESS",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "ERROR IN ADMIN MIDDLEWARE",
      error,
    });
  }
};

module.exports = { requireSignIn, isAdmin };
