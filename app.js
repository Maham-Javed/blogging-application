require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// routes
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./modals/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

// Connecting MongoDB:
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB is connected!!"));

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public"))); // serve our static content eg: public folder images.

// render homepage
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
