const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.genToken = (id) => {
  const token = jwt.sign(id, "123");
  return token;
};

exports.authToken = async (req, res, next) => {
  const { userLinkedin } = req.cookies;
  console.log(userLinkedin,'LINKEDIN');
  const userId = jwt.decode(userLinkedin);
  const userData = await User.findById(userId)
  .populate({
    path: 'posts',
    populate: {
      path: 'comment',
      populate: {
        path: 'author',  // if you want to populate comment authors
      },
    },
  })
  .exec();


  return res
    .status(200)
    .send({ message: "User Fetched Successfully!", userData });
};
