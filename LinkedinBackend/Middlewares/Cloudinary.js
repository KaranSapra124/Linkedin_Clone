const cloudinary = require("cloudinary");
require("dotenv").config();
cloudinary.v2.config({
  cloud_name: "dyeotd3a0",
  api_key: "457287411398281",
  api_secret: process.env.CLOUDINARY_KEY,
  secure: true,
});

const cloudinaryUploadFn = async (fileBuffer) => {
  try {
    const uploadResult = await new Promise((resolve) => {
      cloudinary.v2.uploader
        .upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
        })
        .end(fileBuffer);
    });
    return uploadResult;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

module.exports = cloudinaryUploadFn;
