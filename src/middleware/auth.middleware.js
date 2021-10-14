const passport = require('passport')

exports.authenticateLocal = async (req, res, next) => {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        status: false, message: "wrong username or password"
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(401).json({
          status: false, message: "wrong username or password"
        });
      }
      next();
    });



  })(req, res, next)
}

exports.authenticateJWT = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        status: false, message: "wrong username or password"
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(401).json({
          status: false, message: "wrong username or password"
        });
      }

      next();
    });



  })(req, res, next)
}

//access control
exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({
      status: false, message: "wrong username or password"
    });
  }
}