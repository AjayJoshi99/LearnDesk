const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  quote: { type: String, required: true },
  author: { type: String },
});

module.exports = mongoose.model("Quote", quoteSchema);
