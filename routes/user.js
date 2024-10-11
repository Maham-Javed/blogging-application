const { Router } = require("express");
const User = require("../modals/user");
const { JsonWebTokenError } = require("jsonwebtoken");

const router = Router();

// Signin get route:
router.get("/signin", (req, res) => {
  return res.render("signin");
});

// Signup get route:
router.get("/signup", (req, res) => {
  return res.render("signup");
});

// Sign-in post route.
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndCreateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

// Sign-up post route.
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

// Logout get route:
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
