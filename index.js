const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// routes
const userRoute = require("./routes/user");

// Connecting MongoDB:
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then((e) => console.log("MongoDB is connected!!"));

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
