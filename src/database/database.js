const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CNN);
console.log("Database connected");

module.exports = mongoose;
