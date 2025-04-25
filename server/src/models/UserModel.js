const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "https://github.com/shadcn.png",
    },

    bio: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "customer",
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe", // Assuming 'Recipe' is another model
      },
    ],
    userLikeCount: {
      type: Number,
      default: 0,
    },

    creditPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
