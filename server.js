const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoute");
const cors = require("cors");
const path = require("path");
//rest object
const app = express();

console.log(__dirname);
//config dotenv
dotenv.config();

//database config
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productRoute);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.get("/", (req, res) => {
//   // res.send({
//   //     message:"<h1>WELCOME TO E-COMMERCE APP</h1>"
//   // })
//   res.send("<h1>WELCOME TO E-COMMERCE APP</h1>");
// });
//port
const PORT = process.env.PORT || 8080;
//run app
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT} Port`.bgBlack.green);
});
