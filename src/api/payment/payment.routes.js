"use strict";

const controller = require("./payment.controller");
const express = require("express");
const { authenticateJWT, ensureAuthenticated } = require("../../middleware/auth.middleware");
const router = express.Router();

router.get("/verify/:reference", authenticateJWT, ensureAuthenticated, controller.verify);


//access control

module.exports = router;
