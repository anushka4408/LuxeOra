const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const orderModel = require("../models/OrderModel");
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!question) {
      return res.send({ message: "Answer is required" });
    }
    //if exesting user
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      question,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registred Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR IN REGISTRATION",
      error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validataion
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Does not Exist",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid password",
      });
    }
    //TOKEN
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Logged In Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR IN LOGGING IN",
      error,
    });
  }
};

//forgot password
const forgotpasswordcontroller = async (req, res) => {
  try {
    const { email, question, newPassword } = req.body; // Fix: use req.body instead of res.body

    // Validate inputs
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!question) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }

    // Validate security question
    if (user.question !== question) {
      return res.status(400).send({
        success: false,
        message: "Wrong answer to the security question",
      });
    }

    // Hash new password
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    // Send success response
    res
      .status(200)
      .send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error, // Include only the error message for security
    });
  }
};

const testController = (req, res) => {
  console.log("PROTECTED ROUTE");
  res.send("PROTECTED ROUTE");
};

//UPDATE PROFILE
const UpdateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    //password
    if (!password && password.length < 6) {
      return res.json({ error: "PASSWORD IS REQUIRED AND 6 CHARACTER LONG" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updateduser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: password || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        email: email || user.email,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated successfully",
      updateduser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const GetOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyers: req.user._id })
      .populate("products", "-photo")
      .populate("buyers", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

const GetAllOrderController = async (req, res) => {
  try {
    console.log("Fetching orders...");
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyers", "name")
      .sort({ createdAt: -1 }); // This should work now

    console.log("Orders fetched successfully:", orders);
    res.json(orders);
  } catch (error) {
    console.error("Error while getting orders:", error.message);
    res.status(500).send({
      success: false,
      message: "Error While Getting all Orders",
      error: error.message,
    });
  }
};

const OrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While Updating Order Status",
      error: error.message,
    });
  }
};

const GetAllUserController = async (req, res) => {
  try {
    console.log("Fetching orders...");
    const users = await userModel.find({}, "-password");

    console.log("Orders fetched successfully:", users);
    res.json(users);
  } catch (error) {
    console.error("Error while getting users:", error.message);
    res.status(500).send({
      success: false,
      message: "Error While Getting all users",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotpasswordcontroller,
  testController,
  UpdateProfileController,
  GetOrderController,
  GetAllOrderController,
  OrderStatusController,
  GetAllUserController,
};
