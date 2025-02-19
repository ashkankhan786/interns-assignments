require("dotenv").config();
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const recipientEmail = "hr@ignitershub.com";
const subject = "Challenge 3 Completed";
const body = `
  Name: Mohd Ashkan Khan
  Semester: Final Year
  Branch: Computer Science Engineering
  Roll Number: 210180101035
`;

const attachmentPath = path.join(__dirname, "attachments", "img1.jpeg");

if (!fs.existsSync(attachmentPath)) {
  console.error("Attachment not found!");
  process.exit(1);
}

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const ext = path.extname(attachmentPath).toLowerCase();
const mimeType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

// Email Options
const mailOptions = {
  from: process.env.USER,
  to: recipientEmail,
  subject: subject,
  text: body,
  attachments: [
    {
      filename: path.basename(attachmentPath),
      path: attachmentPath,
      contentType: mimeType,
    },
  ],
};

// Send Email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
