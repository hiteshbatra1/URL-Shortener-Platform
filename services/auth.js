const jwt = require("jsonwebtoken");
const secret = "hitesh@123";

function setUser(user) {
  const tokenFor5m = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secret,
    { expiresIn: "5m" }
  );
  const tokenFor1hr = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secret,
    { expiresIn: "1hr" }
  );
  return { tokenFor5m, tokenFor1hr };
}

function getUser(tokenFor5m, tokenFor1hr) {
  if (!tokenFor1hr) return null;
  if (tokenFor5m) {
    return jwt.verify(tokenFor5m, secret);
  } else {
    return jwt.verify(tokenFor1hr, secret);
  }
}
module.exports = {
  setUser,
  getUser,
};
