const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Last name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Password mismatch!");
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
