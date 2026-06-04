const User = require("../models/user");

const { setUser } = require("../services/auth");

const { validateSchema } = require("../middlewares/validate");

async function handleUserSignUp(req, res) {
  const { error } = validateSchema.validate(req.body);
  if (error) return res.status(400).redirect("signup");

  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { Error: "invalid email or password" });
  }

  const tokens = setUser(user);
  res.cookie("tokenFor5m", tokens.tokenFor5m);
  res.cookie("tokenFor1hr", tokens.tokenFor1hr);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogIn,
};
