const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
      require: true,
    },
    passward: {
      type: String,
      require: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("passward")) return;

  const salt = randomBytes(16).toString();
  const hashedPassward = createHmac("sha256", salt)
    .update(user.passward)
    .digest("hex");

  this.salt = salt;
  this.passward = hashedPassward;

  next();
});

const User = model("user", userSchema);

module.exports = User;
