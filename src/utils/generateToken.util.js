const jwt = require("jsonwebtoken");
const config = require("../config");

const { secret, tokenExpirationTime } = config.server;

// default expirtion date of 14 days (2 weeks)
exports.generateToken = (_id, expirations = tokenExpirationTime) =>
  jwt.sign(_id, secret, { expiresIn: expirations }); // 14 days expiration period for all tokens
