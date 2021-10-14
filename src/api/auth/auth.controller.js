"use strict";

const User = require("../../models/users.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/generateToken.util")

exports.signup = async (req, res) => {
  const { username, password } = await User(req.body);
  let newUser = new User({
    username,
  })

  try {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        throw new Error("Internal server error");
      }
      bcrypt.hash(password, salt, (err2, hash) => {
        if (err2) {
          throw new Error("Internal server error");
        }
        newUser.password = hash;

        newUser.save().then((user) => {

          // authenticate the user after signup
          req.login(user, async (err) => {
            if (err) {
              throw new Error("Wrong username or password");
            }
            // generate Token
            let token = await generateToken({ _id: user?._id });
            return res.status(200).json({ status: true, message: "successfully registered", user, token });
          });
        }).catch(err => {
          return res.status(401).json({ status: false, message: "user already exist" });
        })

      })
    })

  } catch (error) {
    return res.status(501).json({ status: false, message: error.message });
  }

};

exports.signin = async (req, res) => {


  // generate Token
  let token = await generateToken({ _id: req.user?._id });
  //  user already authenticated
  return res.status(200).json({ status: true, message: "successfully registered", user: req.user, token })
};
