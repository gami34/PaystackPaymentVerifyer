"use-strict";
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/users.model");
const bcrypt = require("bcryptjs");

module.exports = async (passport) => {
  // Local Strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      // match username
      const query = { username: username };

      User.findOne(query, (err, user) => {
        if (err) {
          throw err;
        } else if (!user) {
          return done(null, false, { message: "Wrong Username. or Password" });
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            } else if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Wrong Username or Password",
              });
            }
          });
        }
      });
    }),
  );
};
