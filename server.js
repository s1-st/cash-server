const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let otpStore = {}; // temporary storage

// EMAIL CONFIG (use Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mwathageoffrey0@gmail.com",
    pass: "sqbu soik lkqw lsvh"
  }
});

// SEND OTP
app.post("/send-otp", (req, res) => {
  const email = req.body.email;

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = otp;

  const mailOptions = {
    from: "YOUR_EMAIL@gmail.com",
    to: email,
    subject: "Your Verification Code",
    text: `Your OTP code is: ${otp}`
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return res.json({ success: false, message: "Email failed" });
    }
    res.json({ success: true });
  });
});

// VERIFY OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ success: true });
  }

  res.json({ success: false });
});

app.listen(3000, () => console.log("Server running"));
