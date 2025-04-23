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
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser-profile_10337609&psig=AOvVaw2UthBJ9hYgpN1j45Ux8Dz4&ust=1745467848729000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCy7syk7YwDFQAAAAAdAAAAABAE",
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
