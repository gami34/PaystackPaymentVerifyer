const { validationResult } = require('express-validator') // documentation for express-validator https://express-validator.github.io/docs/

// validate handler
exports.errorDataHandler = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {

    let message = "";
    errors.array().forEach(objElement => {
      message = message + objElement["msg"] + "\n"
    })

    return res.status(422).json({ successful: false, message })
  } else {
    next()
  }
}
