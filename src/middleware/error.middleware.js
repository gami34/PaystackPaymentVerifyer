module.exports = async function (err, req, res, next) {
  // set locals, only providing error in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
};
