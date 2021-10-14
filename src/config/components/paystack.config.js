'use strict'

const joi = require('joi')
require('dotenv').config()

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi.object({
 PAYSTACK_API_KEY: joi.string(),
}).unknown()
 .required()

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = envSchema.validate(process.env)
if (error) {
 throw new Error(`Paystack Config validation error: ${error.message}`)
}

const config = {
 paystack: {
  api_key: envVars.PAYSTACK_API_KEY,
 }
}

module.exports = config
