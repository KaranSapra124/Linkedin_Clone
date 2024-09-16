const User = require("../Models/User");
const cloudinary = require("../Middlewares/Cloudinary");
const sendEmail = require("../utils/nodemailer");
const { genToken } = require("../utils/JwtAuth");
const Comment = require("../Models/Comment");
const Post = require("../Models/Post");

exports.createUser = async (req, res) => {
  const { userName, email, mobile } = req.body;
  const file = req.file;
  // console.log(file);
  const newUser = {
    userProfilePic: "",
    userName,
    email,
    mobile,
  };
  if (file) {
    const result = await cloudinary(file.buffer);
    console.log(result);
    newUser.userProfilePic = result.secure_url;
  }

  await User.create(newUser);
  return res.status(201).send({ message: "User Created Successfully!" });
};

exports.logUser = async (req, res) => {
  const { mobile } = req.body;
  // console.log(mobile);

  const user = await User.findOne({ mobile: mobile });
  console.log(user);

  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < digits.length; i++) {
    if (otp.length < 6) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
  }
  sendEmail(user?.email, "OTP For Authentication", "All good", `<p>${otp}</p>`);
  user.otp = otp;
  await user.save();
  return res.status(200).send({ message: "OTP Sent Successfully!" });
};

exports.verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  const user = await User.findOne({ mobile: mobile });
  const token = genToken(user?._id.toString());
  console.log(token, "TOKEN");
  if (user.otp === otp) {
    return res.status(200).send({ message: "OTP Verified!", token });
  }
};

exports.createComment = async (req, res) => {
  const { formData, comment } = req.body;
  console.log(formData, "FORM");
  const newComment = await Comment.create({
    author: formData,
    comment: comment,
  });
  const user = await Post.findById(formData);
  console.log(user, "USER");
  user?.comment?.push(newComment?._id);
  await user.save();

  return res.status(201).send({ message: "Comment Posted Successfully!" });
};
