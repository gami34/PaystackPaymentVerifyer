const { check } = require('express-validator') // documentation for express-validator https://express-validator.github.io/docs/


// validated common data
exports.signinValidDataChecker = [
  check('username', 'Username Field is required').not().isEmpty(),
  check('username', 'Username is not a valid Email').isEmail(),
  check('password', 'Password Field is required').not().isEmpty(),
  check('password', 'min of 4 and max of 12').isLength({ min: 4, max: 12 }),
]
