const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Fixed typo
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true, // Fixed typo
  },
});

module.exports = mongoose.model("Category", categorySchema);
