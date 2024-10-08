const { Router } = require("express");
const User = require("../modals/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

// Sign-in post route.
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.matchPassword(email, password);

  console.log("User", user);
  return res.redirect("/");
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

module.exports = router;
