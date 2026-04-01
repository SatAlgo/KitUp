import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmailOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: '"KitUp Verification" <your-email@gmail.com>',
    to: email,
    subject: "KitUp Account Verification OTP",
    html: `<h3>Welcome to KitUp!</h3>
           <p>Your OTP for registration is: <b>${otp}</b></p>
           <p>This code expires in 10 minutes.</p>`
  };

  return transporter.sendMail(mailOptions);
};