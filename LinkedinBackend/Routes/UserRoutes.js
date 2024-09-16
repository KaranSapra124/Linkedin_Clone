const express = require("express");
const {
  createUser,
  logUser,
  verifyOtp,
  createComment,
} = require("../Controller/UserController");
const upload = require("../utils/multerConfig");
const { authToken } = require("../utils/JwtAuth");
const {
  addPost,
  getPosts,
  editPosts,
} = require("../Controller/PostController");

const Router = express.Router();

Router.post("/sign-up", upload.single("userProfilePic"), createUser);
Router.post("/log-in", logUser);
Router.post("/verify-otp", verifyOtp);
Router.get("/auth-user", authToken);
Router.post("/create-post", addPost);
Router.get("/get-posts", getPosts);
Router.post("/edit-post", editPosts);
Router.post("/add-comment", createComment);
module.exports = Router;
