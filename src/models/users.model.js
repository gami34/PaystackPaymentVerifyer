'use strict'

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String },
    account: { type: Number, default: 0 },
    bonusCount: { type: Number, default: 0 },
  },
  {
    collection: 'users',
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

userSchema.index({ username: 1 }, {
  unique: true,
  sparse: true,
  partialFilterExpression: { username: { $type: 'string' } },
  background: false
})

const User = mongoose.model('users', userSchema)
module.exports = User
