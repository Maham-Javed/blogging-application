const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// routes
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

// Connecting MongoDB:
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then((e) => console.log("MongoDB is connected!!"));

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
