const express = require("express");
const path = require("path");

// routes
const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
