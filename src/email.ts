import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_KEY
  }
});

export const sendEmail = async (
  recipients: string[],
  subject: string,
  text: string
) => {
  try {
    await transporter.sendMail({
      from: `Roast Report <${process.env.EMAIL_USER}>`,
      to: recipients,
      subject,
      text,
      html: text,
    });
    console.log(`Email sent to: ${recipients.join(", ")}`);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};
