const { Router } = require("express");
const User = require("../modals/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, passward } = req.body;

  await User.create({
    fullName,
    email,
    passward,
  });

  return res.redirect("/");
});

module.exports = router;
