const nodemailer = require("nodemailer");
require("dotenv").config(); // For loading environment variables

// Create a transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saprakaran001@gmail.com", // Your Gmail address
    pass: "szaz mhnr jlxf ncat", // Your Gmail password or App-specific password
  },
});

// Function to send email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: "saprakaran001@gmail.com", // Sender address
    to, // List of recipients
    subject, // Subject line
    text, // Plain text body
    html, // HTML body
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
