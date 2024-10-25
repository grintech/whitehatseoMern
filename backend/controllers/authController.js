  const express = require('express');
  const User = require('../models/User');
  const bcrypt = require('bcryptjs');

  const createUser = async (req, res) => { 
    try {
      const { username, email, phone, password } = req.body;

      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const phoneExist = await User.findOne({ phone });
      if (phoneExist) {
        return res.status(400).json({ msg: "Phone number already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userCreated = await User.create({
        username,
        email,
        phone,
        password: hashedPassword
      });

      res.status(200).json({
        msg: "User created successfully",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", error: error.message });
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, userExist.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid email or password" });
      }

      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString()
      });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", error: error.message });
    }
  };

  const getUser = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", error: error.message });
    }
  };

  const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", error: error.message });
    }
  };

    const deleteUserById = async (req, res) => {
      try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully" });
      } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
      }
    };

module.exports = { createUser, login, getUser, getUserById, deleteUserById };
