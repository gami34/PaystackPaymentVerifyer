"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },
    email: { type: String },
    mobile: { type: String },
    role: { type: String, enum: ["vendor", "rider", "customer"] },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

const User = mongoose.model("users", userSchema);
module.exports = User;
