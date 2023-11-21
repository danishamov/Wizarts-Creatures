const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: 3,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    minLength: 10,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 4,
  },
});
// userSchema.path("email").validate(function (emailInput) {
//   const email = mongoose.model("User").findOne({ email: emailInput });
//   return !!email;
// }, "Email already exists!");

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Password mismatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
