"use strict";

const generateId = require("../../utils/generateId.util");
const createError = require("http-errors");
/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = {
  users: [
    {
      id: "bff28903-042e-47c2-b9ee-07c3954989ec",
      name: "Marco",
      created_at: 1558536830937,
    },
    {
      id: "dca01a32-36e6-4886-af75-8e7caa0162a9",
      name: "Leonardo",
      created_at: 1558536843742,
    },
    {
      id: "dca01a32-36e6-4886-af75-8e7caa0162a9",
      name: "Berta",
      created_at: 1558536863550,
    },
  ],
};

exports.getOne = (req, res, next) => {
  const { userId } = req.params;
  const user = db.users.find((user) => user.id === userId);
  if (!user) return next(createError(404, "The requested user doesn't exist"));
  res.status = 200;
  res.json({ user });
};

exports.getAll = async (req, res, next) => {
  res.status = 200;
  res.json({ users: db.users });
};

exports.createOne = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return next(createError(400, "The user info is malformed!"));
  const id = generateId();

  const newUser = {
    id,
    name,
    timestamp: Date.now(),
  };
  db.users.push(newUser);
  const createdUser = db.users.find((user) => user.id === id);
  res.status = 201;
  res.json({ createdUser });
};
