const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postContent: {
      type: String,
      required: true,
    },
    postMedia: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
      ref: "Likes",
      default: 0, // Note: This might not be appropriate if `likes` should reference a `Likes` document.
    },
    comment: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [], // Changed to `null` for consistency
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema); // Changed 'PostModel' to 'Post'
