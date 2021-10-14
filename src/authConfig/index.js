"use strict";

const fs = require("fs");
const path = require("path");
const passport = require("passport");
const User = require("../models/users.model");

const baseName = path.basename(__filename);

function applyAuthMiddleware(app) {
  // express session middleware and also sets the user cookie

  // setup passport middleware

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== baseName)
    .forEach((file) => {
      require(path.join(__dirname, file))(passport);
    });

  // serialize the user db id
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // deserialize the db id and get the user info
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      return done(err, user);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = applyAuthMiddleware;
