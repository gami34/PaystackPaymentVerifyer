"use strict";

const controller = require("./user.controller");
const express = require("express");
const router = express.Router();

router.get("/:userId", controller.getOne);
router.get("/", controller.getAll);
router.post("/", controller.createOne);

module.exports = router;
