const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userProfilePic: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    posts: {
      type: [mongoose.Types.ObjectId],
      ref: "Post",
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: "Comment",
      default:[]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
