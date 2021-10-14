"use strict";

const fs = require("fs");
const path = require("path");

const { apiVersion } = require("../config").server;
const baseName = path.basename(__filename);

function applyApiMiddleware(app) {
  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== baseName)
    .forEach((file) => {
      const api = require(path.join(__dirname, file));
      app.use(`/api/${apiVersion}/${file}`, api);
    });
}

module.exports = applyApiMiddleware;
