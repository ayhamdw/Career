const nodemailer = require("nodemailer");
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
  transporter.sendMail({
    to: email,
    from: process.env.EMAILUSER,
    subject: "Goodbye",
    text: `Goodbye ${name}. It's sad to see you go. Is there anything we could have done to keep you?`,
  });
};

const sendResetCode = (email, code) => {
  transporter.sendMail({
    to: email,
    from: process.env.EMAILUSER,
    subject: "Password Reset Code",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #58d68d; text-align: center;">Password Reset Request</h2>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">
          We received a request to reset your password. Please use the verification code below to proceed:
        </p>
        <div style="margin: 20px auto; text-align: center;">
          <span style="font-size: 24px; color: #58d68d; font-weight: bold;">${code}</span>
        </div>
        <p style="font-size: 16px;">Enter this code in the app to reset your password. If you didn't request a password reset, please ignore this email.</p>
        <br>
        <footer style="text-align: center; margin-top: 20px;">
          <p style="font-size: 12px; color: #aaa;">&copy; 2024 Career Company. All rights reserved.</p>
        </footer>
      </div>
    `,
  });
};

const sendVerificationCode = (email, code) => {
  transporter.sendMail({
    to: email,
    from: process.env.EMAILUSER,
    subject: "Verification Signup Code",
    html: `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
  <h2 style="color: #58d68d; text-align: center;">Account Verification</h2>
  <p style="font-size: 16px;">Hello,</p>
  <p style="font-size: 16px;">
    Thank you for signing up! To complete your registration, please use the verification code below:
  </p>
  <div style="margin: 20px auto; text-align: center;">
    <span style="font-size: 24px; color: #58d68d; font-weight: bold;">${code}</span>
  </div>
  <p style="font-size: 16px;">Enter this code in the app to verify your account. If you did not sign up, please ignore this email.</p>
  <br>
  <footer style="text-align: center; margin-top: 20px;">
    <p style="font-size: 12px; color: #aaa;">&copy; 2024 Career Company. All rights reserved.</p>
  </footer>
</div>`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
  sendResetCode,
};
