const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");
require("dotenv").config({ path: __dirname + "/config/.env" });
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASSWORD,
  },
});

const sendWelcomeEmail = (email, name) => {
  //send email with transporter
  console.log(process.env.EMAILUSER);
  console.log(process.env.EMAILPASSWORD);
  transporter.sendMail({
    to: email,
    from: process.env.EMAILUSER,
    subject: "Welcome",
    text: `Welcome to the Career, ${name}. Let me know how you get along with the app`,
  });
};

const sendCancellationEmail = (email, name) => {
  transporter.sendEmail({
    to: email,
    from: process.env.EMAILUSER,
    subject: "Goodbye",
    text: `Goodbye ${name}. It's sad to see you go. Is there anything we could have done to keep you?`,
  });
};

const sendCode = (email, code) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  transporter.sendEmail({
    to: email,
    from: process.env.EMAILUSER,
    subject: "Verification Code",
    text: `Your verification code is ${code}`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
  sendCode,
};
