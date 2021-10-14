const { check } = require('express-validator') // documentation for express-validator https://express-validator.github.io/docs/

// validated common data
exports.signupValidDataChecker = [
  check('username', 'Username Field is required').not().isEmpty(),
  check('username', 'Username is not a valid Email').isEmail(),
  check('password', 'Password Field is required').not().isEmpty(),
  check('password', 'min of 4 and max of 12').isLength({ min: 4, max: 12 }),
  check('confirm_password', 'passwords do not match').custom((value, { req }) => {
    if (value == req.body.password) {
      return value;
    } else {
      throw new Error()
    }
  })
];