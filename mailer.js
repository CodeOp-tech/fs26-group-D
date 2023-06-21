const nodemailer = require("nodemailer");
require("dotenv").config();

let emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

module.exports = transporter;
