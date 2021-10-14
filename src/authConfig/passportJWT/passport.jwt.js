"use-strict";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../../models/users.model");
const config = require("../../config");

const { secret } = config.server;

// options for the jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

module.exports = async (passport) => {
  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      User.findOne({ _id: jwtPayload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    }),
  );
};
