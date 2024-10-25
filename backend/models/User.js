// usermodel

const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// json web token

userSchema.methods.generateToken = function () {
  try{
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
      }, 
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
  )
  }catch(error){
    console.log(error)
  }
}

module.exports = mongoose.model('User', userSchema);
