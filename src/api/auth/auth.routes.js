"use strict";

const controller = require("./auth.controller");
const express = require("express");
const router = express.Router();

router.post("/signup", controller.signup);

module.exports = router;
