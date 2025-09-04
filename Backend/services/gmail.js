import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const MAIL_USER = process.env.MAIL_USER
const MAIL_PASSWORD = process.env.MAIL_PASSWORD

export const SendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `<${MAIL_USER}>`,
      to,
      subject,
      html
    }

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error Sending Email", error)
  }
};