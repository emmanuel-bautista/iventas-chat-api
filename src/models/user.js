const mongoose = require("../database/database");
const { v4: uuid } = require("uuid");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  priority: { type: String, required: true },
  problem: { type: String, required: true },
  promotion: { type: String, required: true },
  password: { type: String, required: true },
  curp: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
