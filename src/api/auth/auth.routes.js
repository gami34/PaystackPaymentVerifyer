"use strict";

const controller = require("./auth.controller");
const express = require("express");
const { authenticateLocal } = require("../../middleware/auth.middleware");
const { signupValidDataChecker } = require("../../validator/signup.validator");
const { signinValidDataChecker } = require("../../validator/signin.validator");
const { errorDataHandler } = require("../../validator/errorDataHandler.validator");
const router = express.Router();

router.post("/signup", signupValidDataChecker, errorDataHandler, controller.signup);
router.post("/signin", signinValidDataChecker, errorDataHandler, authenticateLocal, controller.signin);

module.exports = router;
