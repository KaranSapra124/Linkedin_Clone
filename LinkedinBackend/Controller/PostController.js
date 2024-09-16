const Post = require("../Models/Post");
const User = require("../Models/User");

exports.addPost = async (req, res) => {
  const { postContent, postMedia, author } = req.body;

  const newPost = await Post.create({ postContent, author });
  const user = await User.findOne({ _id: author });
  user.posts.push(newPost?._id);
  await user.save();
  return res
    .status(201)
    .send({ message: "Post Created Successfully!", newPost });
};

exports.getPosts = async (req, res) => {
  const Posts = await Post.find().populate("author").populate("comment");

  return res.status(200).send({ message: "Post Fetched Successfully!", Posts });
};

exports.editPosts = async (req, res) => {
  const { formData, likes } = req.body;
  const Posts = await Post.findByIdAndUpdate(formData?._id, { likes: likes });
  return res.status(200).send({ message: "Post Liked Successfully!" });
};


