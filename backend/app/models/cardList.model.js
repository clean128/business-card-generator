const mongoose = require("mongoose");

const User = mongoose.model(
  "CardList",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    userId: Number,
  })
);

module.exports = User;
