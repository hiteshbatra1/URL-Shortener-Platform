const { getUser } = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const tokenFor5m = req.cookies?.tokenFor5m;
  const tokenFor1hr = req.cookies?.tokenFor1hr;

  if (!tokenFor1hr) return res.redirect("/login");

  const user = getUser(tokenFor5m, tokenFor1hr);
  // if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
};
