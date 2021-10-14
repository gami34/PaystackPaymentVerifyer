"use strict";

const User = require("../../models/users.model");

exports.signup = async (req, res) => {
  const newUser = await User(req.body);
  await newUser.save();

  req.login(newUser, function (err) {
    if (err) {
      console.log(err);
    }
    return res.json({ status: "success", user: req.user });
  });
};
