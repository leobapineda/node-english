const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, "Must provide email"],
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must provide password"],
  },
});

// using pre we execute this code before creating the document, here we are saying: hash the password and use that hash as the password before saving the document
userSchema.pre("save", async function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.createToken = function () {
  const token =  jwt.sign({ userName:this.name, userId : this._id }, process.env.SecretTokenKey, {
    expiresIn: "1h",
  });
  return token;
};

// que hacemos con el token
// porque lo creamos desde un principio
// lo creamos para funcionar como otra barrera de entrada
// si el token no existe, no puede entrar, entonces debemos ponerlo como un middleware

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
