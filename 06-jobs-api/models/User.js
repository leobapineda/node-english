const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
  },
  email: {
    type: String,
    required: [true, "Must provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "must provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must provide password"],
  },
});

// Or, assign a function to the "methods" object of our animalSchema
userSchema.methods.findName = function () {
  return this.name;
};

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userName: this.name, userId: this._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const compare = await bcrypt.compare(candidatePassword, this.password);
  return compare;
};
// pre
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

  
module.exports = mongoose.model("User", userSchema);
